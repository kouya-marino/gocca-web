#!/bin/sh
#
# Pre-flight check for the Gocca site. No dependencies — just sh and grep, so it
# runs on this Mac and on a CI runner without installing anything.
#
#   ./check.sh
#
# It replaces the old React route check. Because every page is now hand-edited
# and the header/footer are copy-pasted across seven files, the failure mode has
# changed: the risk is no longer "a component threw", it is "this page still has
# the previous page's canonical URL". That is what most of these assertions are
# looking for.

set -u

SITE="https://www.gocca.in"
PAGES="index.html services/index.html corporate-gifting/index.html team/index.html work-with-us/index.html"
ALL="$PAGES thank-you/index.html 404.html"
fails=0
warns=0

fail() {
  printf '  \033[31m✗\033[0m %s\n' "$1"
  fails=$((fails + 1))
}
pass() { printf '  \033[32m✓\033[0m %s\n' "$1"; }
# Known-pending launch items: reported every run, but they do not fail the
# check, or it would never pass and would stop being worth running.
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; warns=$((warns + 1)); }

# The public URL a given file is served at.
url_for() {
  case "$1" in
    index.html) echo "/" ;;
    *) echo "/$(dirname "$1")/" ;;
  esac
}

count() { grep -o "$1" "$2" 2>/dev/null | wc -l | tr -d ' '; }

echo
echo "Pages"
for f in $ALL; do
  [ -f "$f" ] || { fail "$f is missing"; continue; }
  ok=1

  # --- structure ---
  [ "$(count '<h1' "$f")" = "1" ] || { fail "$f: expected exactly 1 <h1>, found $(count '<h1' "$f")"; ok=0; }
  grep -q '<html lang="en">' "$f" || { fail "$f: missing lang=\"en\""; ok=0; }
  grep -q '<meta charset="UTF-8"' "$f" || { fail "$f: missing charset"; ok=0; }
  grep -q 'name="viewport"' "$f" || { fail "$f: missing viewport"; ok=0; }
  grep -q 'id="main"' "$f" || { fail "$f: missing <main id=\"main\">"; ok=0; }
  grep -q 'href="#main"' "$f" || { fail "$f: missing skip link"; ok=0; }

  # --- head tags that must appear exactly once ---
  for tag in '<title>' 'name="description"' 'property="og:title"' \
             'property="og:description"' 'property="og:image"' \
             'property="og:type"' 'property="og:site_name"' 'name="twitter:card"'; do
    n=$(count "$tag" "$f")
    [ "$n" = "1" ] || { fail "$f: '$tag' appears $n times, expected 1"; ok=0; }
  done

  want=$(url_for "$f")
  case "$f" in
    thank-you/index.html|404.html)
      # noindex pages must not self-canonicalise — that tells search engines a
      # not-found page is a real, indexable URL.
      grep -q 'name="robots" content="noindex"' "$f" || { fail "$f: should be noindex"; ok=0; }
      [ "$(count 'rel="canonical"' "$f")" = "0" ] || { fail "$f: noindex page must not have a canonical"; ok=0; }
      [ "$(count 'property="og:url"' "$f")" = "0" ] || { fail "$f: noindex page must not have og:url"; ok=0; }
      [ "$(count 'aria-current' "$f")" = "0" ] || { fail "$f: should have no aria-current (not in the nav)"; ok=0; }
      ;;
    *)
      # --- the big one: canonical must match THIS file's own path ---
      grep -q "rel=\"canonical\" href=\"$SITE$want\"" "$f" \
        || { fail "$f: canonical is not $SITE$want (copy-paste from another page?)"; ok=0; }
      grep -q "property=\"og:url\" content=\"$SITE$want\"" "$f" \
        || { fail "$f: og:url does not match canonical"; ok=0; }
      # exactly one nav item marked current, and it must be this page
      n=$(count 'aria-current="page"' "$f")
      [ "$n" = "1" ] || { fail "$f: expected 1 aria-current=\"page\", found $n"; ok=0; }
      grep -q "href=\"$want\" aria-current=\"page\"" "$f" \
        || { fail "$f: aria-current is on the wrong nav link"; ok=0; }
      ;;
  esac

  # --- every nav label present, so a page can't silently lose one ---
  for label in 'Home' 'Services' 'Corporate Gifting' 'Team' 'Work With Us'; do
    grep -q ">$label<" "$f" || { fail "$f: nav item '$label' is missing"; ok=0; }
  done

  [ "$ok" = "1" ] && pass "$f"
done

echo
echo "Internal links"
for f in $ALL; do
  for href in $(grep -o '\(href\|src\)="/[^"#]*"' "$f" | sed 's/.*="//;s/"//' | sort -u); do
    case "$href" in
      */) target="${href#/}index.html" ;;
      *)  target="${href#/}" ;;
    esac
    [ -f "$target" ] || fail "$f links to $href but $target does not exist"
  done
done
[ "$fails" = "0" ] && pass "all internal links resolve"

echo
echo "Leaks"
# Instructions to the site owner, draft markers and leftovers must never reach a
# visitor. This is stricter than the build-time flag it replaces, because it also
# catches the same text arriving inside an HTML comment.
for word in 'Site owner' 'TODO' 'FIXME' 'Lorem' 'paste your' 'src/data' 'import.meta' 'DRAFT'; do
  if grep -rl "$word" --include='*.html' . >/dev/null 2>&1; then
    fail "the string '$word' appears in a served page: $(grep -rl "$word" --include='*.html' . | tr '\n' ' ')"
  fi
done
grep -rq 'XXXXXXXXXX' --include='*.html' . 2>/dev/null \
  && warn "the WhatsApp number is still a placeholder"
# A personal Gmail on a business domain is a stopgap. Nagging until it moves to a
# mailbox on gocca.in, which is what a company placing a bulk order expects to see.
grep -rq 'gmail\.com' --include='*.html' . 2>/dev/null \
  && warn "TEMPORARY: contact address is a personal Gmail — move it to a mailbox on gocca.in before this gets promoted"
# The raw address in a form action gets scraped. FormSubmit gives you an alias
# (formsubmit.co/el/xxxxxx) once the address is activated; use it.
grep -rq 'formsubmit\.co/[^e][^l]' --include='*.html' . 2>/dev/null \
  && warn "FormSubmit: still posting to the raw address. Activate it, then swap in the /el/ alias so the address is not scraped from the public HTML"
[ "$fails" = "0" ] && pass "no owner instructions or draft markers in any page"

echo
echo "Deploy files"
[ -f CNAME ] && [ "$(cat CNAME)" = "www.gocca.in" ] \
  && pass "CNAME reads www.gocca.in" \
  || fail "CNAME must exist and read exactly www.gocca.in"
[ -f .nojekyll ] && pass ".nojekyll present" || fail ".nojekyll is missing (Jekyll will eat files)"
[ -f assets/og-image.jpg ] && pass "og-image.jpg present" || fail "assets/og-image.jpg is missing"

for loc in $(grep -o '<loc>[^<]*</loc>' sitemap.xml | sed "s|<loc>$SITE||;s|</loc>||"); do
  case "$loc" in
    /) t="index.html" ;;
    */) t="${loc#/}index.html" ;;
    *) t="${loc#/}" ;;
  esac
  [ -f "$t" ] || fail "sitemap lists $loc but $t does not exist"
  case "$loc" in */|/) ;; *) fail "sitemap entry $loc has no trailing slash" ;; esac
done
for f in $PAGES; do
  u=$(url_for "$f")
  grep -q "<loc>$SITE$u</loc>" sitemap.xml || fail "$f ($u) is missing from sitemap.xml"
done

echo
if [ "$fails" = "0" ]; then
  printf '\033[32mAll checks passed.\033[0m'
  [ "$warns" != "0" ] && printf ' \033[33m(%s launch item(s) still pending)\033[0m' "$warns"
  printf '\n\n'
  exit 0
fi
printf '\033[31m%s check(s) failed.\033[0m\n\n' "$fails"
exit 1
