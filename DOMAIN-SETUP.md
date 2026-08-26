# Pointing www.gocca.in at this GitHub repo

End-to-end: push the code, turn on GitHub Pages, change the DNS at GoDaddy, and
forward `gocca.co.in` across.

**Canonical address: `https://www.gocca.in`.** The bare `gocca.in` redirects to
it, and so does everything on `gocca.co.in`. One address, everywhere.

This guide assumes the GitHub account **`kouya-marino`** and the repo
**`gocca-web`**.

---

## Where this got to — resume here

**Status as of 27 Aug 2026: the site is built and committed. Next is one GitHub setting, then the GoDaddy DNS change.**

| # | Step | State |
|---|---|---|
| 1 | Repo pushed, site built | ✅ done — plain HTML, no build step |
| 2 | Pages source → branch `main`, folder `/ (root)` | ⏳ **do this next — one setting** |
| 3 | **GoDaddy DNS for gocca.in** | ⏳ **then this — the only real work left** |
| 4 | Enter `www.gocca.in` in Settings → Pages | blocked on step 3 |
| 5 | Tick Enforce HTTPS | blocked on step 4 |
| 6 | Forward `gocca.co.in` | can be done any time |
| 7 | Verify all four addresses | last |

### What the DNS actually looks like today

Checked directly against the nameservers — 18 records, and **no A records at all**, so nothing needs deleting at the apex:

```
NS     @                        ns13 / ns14.domaincontrol.com        (locked)
SOA    @                                                             (locked)
CNAME  www                      gocca.in.          ← EDIT THIS ONE, TTL 10800
CNAME  cpanel                   gocca.in.          ← dead cPanel leftover
CNAME  webdisk                  gocca.in.          ← dead cPanel leftover
CNAME  webdisk.admin            gocca.in.          ← dead cPanel leftover
CNAME  whm                      gocca.in.          ← dead cPanel leftover
CNAME  www.admin                gocca.in.          ← dead cPanel leftover
CNAME  email                    email.secureserver.net.              ← EMAIL
CNAME  secureserver1._domainkey s1.dkim…onsecureserver.net.          ← EMAIL (DKIM)
CNAME  secureserver2._domainkey s2.dkim…onsecureserver.net.          ← EMAIL (DKIM)
MX     @                        smtp.secureserver.net.       (prio 0)  ← EMAIL
MX     @                        mailstore1.secureserver.net. (prio 10) ← EMAIL
TXT    @                        v=spf1 include:secureserver.net -all ← EMAIL (SPF)
TXT    @                        D6125500                             ← GoDaddy verification
TXT    _dmarc                   v=DMARC1; p=reject; …                ← EMAIL (DMARC)
SRV    _autodiscover._tcp.@     100 1 443 autodiscover.secureserver.net. ← EMAIL
```

### 🚨 Before touching anything

`gocca.in` carries **live, fully-configured email**: MX, SPF, both DKIM keys, autodiscover, and **DMARC set to `p=reject`**.

`p=reject` means receiving mail servers **discard** anything that fails authentication. Break SPF or DKIM and outbound mail stops being delivered **silently** — no bounce message, no error, nothing to alert you. Every record marked `← EMAIL` above is untouchable.

Nothing in step 3 below goes near them. Step 3 only edits the `www` CNAME and adds `A` records on `@`.

### Worth doing while you're in there

Delete the five dead cPanel CNAMEs (`cpanel`, `webdisk`, `webdisk.admin`, `whm`, `www.admin`). They point at `gocca.in.`, which resolves to nothing today — but the moment you add the apex A records they will all start resolving to GitHub's Pages servers. A hostname pointing at GitHub Pages that no repo has claimed can be claimed by **someone else's** repo, which is a genuine subdomain-takeover route. Having `cpanel.gocca.in` serve a stranger's content is a poor outcome on a domain that also carries your mail. They serve no purpose now that the site isn't cPanel-hosted.

---

## First, the question you asked: do I host only the build folder?

**There is no build folder any more.** The site is plain HTML and CSS, so the
repo *is* the website — the file you edit is the file that gets served.

GitHub Pages can publish from three places:

| Source | What gets served | This site |
|---|---|---|
| **Branch root (`main` → `/`)** | Every file in the repo, as-is | **✓ — this is what we use** |
| Branch subfolder (`/docs`) | Whatever is in `docs/` | ✗ — no reason to nest it |
| GitHub Actions | Whatever a workflow uploads | ✗ — there is nothing to build |

So the answer that used to be "the build folder is what gets hosted, but you
never commit it" is now simply: **you commit the site, and that is what is
served.** No workflow, no artifact, no `dist/`.

Two consequences worth knowing:

- `README.md` and this file are served too, at `/README.md` and
  `/DOMAIN-SETUP.md`. Harmless — the repo is public anyway — but do not put
  anything in this folder you would not want fetched.
- `.nojekyll` (an empty file at the root) is **required**. Branch-served Pages
  runs Jekyll by default, which would try to process the Markdown and silently
  drops any file whose name starts with an underscore.

---

## Step 1 — Push the code

Already done if the repo was created for you. Otherwise:

```bash
git init -b main
git add .
git commit -m "Rebuild the Gocca site as a Vite + React static site"
git remote add origin git@github.com:kouya-marino/gocca-web.git
git push -u origin main
```

> **The repo must be public** on the GitHub Free plan. Publishing Pages from a
> *private* repo requires GitHub Pro, Team or Enterprise — on Free, Pages will
> simply refuse to build and the site will never go live.
>
> Public is fine here: the repo holds no secrets. The only configuration values
> in it are the two Google Form embed URLs, and those are already public by
> definition — they sit in the page HTML that every visitor downloads. Never
> commit an API key or password to this repo, and that stays true.

---

## Step 2 — Turn on GitHub Pages

1. Repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **`main`**, folder: **`/ (root)`**. Save.

Publishing starts within a minute or two. There is no Actions run to watch — the
result appears under the repo's **Deployments** in the right-hand sidebar of the
repo home page.

> If the source currently says **GitHub Actions**, change it. That was for the
> React version, which had a build step. The workflow file has been deleted.

Once it is published the site is live at
`https://kouya-marino.github.io/gocca-web/`. Every page will be there, but the
styling will be missing until the domain is attached — the pages link to
`/assets/styles.css`, which resolves at the domain root, not under a
`/gocca-web/` subpath. That is expected and fixes itself at Step 4.

---

## Step 3 — Change the DNS at GoDaddy

Sign in at GoDaddy → **My Products** → next to **gocca.in** click **DNS**.

You need **both** halves below. The CNAME is what serves the site; the A records
are what let GitHub redirect the bare domain to it.

### 3a. Nothing to delete

The usual advice is to clear GoDaddy's parked A records first. **This domain has
none** — verified against the nameservers. Skip straight to 3b.

Re-read the email warning in *"Where this got to"* above before you start. In
short: DMARC is `p=reject`, so a broken SPF or DKIM record means outbound mail is
discarded silently, with no bounce.

### 3b. Edit the existing www CNAME — this is what serves the site

There is already a `CNAME` on `www` pointing at `gocca.in.`. **Edit that record**
— do not add a second one. DNS permits only one CNAME per name, and GoDaddy will
reject the duplicate.

| Field | From | To |
|---|---|---|
| Type | CNAME | *unchanged* |
| Name | `www` | *unchanged* |
| Data | `gocca.in.` | `kouya-marino.github.io` |
| TTL | 10800 seconds | **1 Hour** |

`kouya-marino.github.io` — **not** the repo name, no `https://`, no path, no
trailing slash.

Change the TTL as well. At 10800 seconds any resolver that has already cached the
old, broken value will keep serving it for up to three hours after your edit.

### 3c. Four A records at the apex — these make gocca.in redirect

GoDaddy does not support ALIAS/ANAME at the apex, so GitHub's four IPv4 addresses
go in individually. Each as **Type: A**, **Name: `@`**, **TTL: 1 hour**:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

All four — they are GitHub's load-balanced Pages servers, and listing one only is
a single point of failure.

With these in place *and* the custom domain set to `www.gocca.in` in Step 4,
GitHub automatically redirects `gocca.in` → `www.gocca.in`. You do not configure
that redirect anywhere; it is a property of the two being set together.

### 3d. Four AAAA records (IPv6 — recommended, not required)

Same pattern, **Type: AAAA**, **Name: `@`**:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### The finished record set

```
Type    Name   Value
CNAME   www    kouya-marino.github.io
A       @      185.199.108.153
A       @      185.199.109.153
A       @      185.199.110.153
A       @      185.199.111.153
AAAA    @      2606:50c0:8000::153
AAAA    @      2606:50c0:8001::153
AAAA    @      2606:50c0:8002::153
AAAA    @      2606:50c0:8003::153
```

---

## Step 4 — Tell GitHub about the domain

Repo → **Settings** → **Pages** → **Custom domain**. Enter, exactly:

```
www.gocca.in
```

Save. GitHub runs a DNS check that may report "domain's DNS record could not be
retrieved" at first — that is propagation, not a mistake. Wait 15–30 minutes and
click **Check again**.

Verify it yourself, which is faster than trusting the UI:

```bash
dig +short www.gocca.in
# expect: kouya-marino.github.io.  then the four 185.199.x.153 addresses

dig +short gocca.in
# expect: the four 185.199.x.153 addresses
```

### About the CNAME file

`CNAME` sits at the repo root and contains exactly `www.gocca.in`.

With branch-root publishing this is simpler than it used to be: **the file *is*
the setting.** When you type the domain into Settings, GitHub commits a root
`CNAME` itself — and since one is already there saying the same thing, nothing
changes. The old warning about an Actions artifact silently losing the custom
domain no longer applies, because there is no artifact.

If you ever change domains, edit `CNAME` and the Settings box together.

---

## Step 5 — Turn on HTTPS

Once the DNS check passes, **Enforce HTTPS** on the Pages settings screen becomes
available. Tick it.

GitHub provisions a free Let's Encrypt certificate automatically. It can take up
to an hour, and the checkbox stays greyed out until it's ready. Nothing to do but
wait.

After that, `http://` redirects to `https://` on its own.

---

## Step 6 — Forward gocca.co.in

**A GitHub Pages site can have exactly one custom domain.** `gocca.co.in` cannot
be added as a second one — redirect it at GoDaddy instead, which is better for
SEO anyway since it consolidates every name onto one canonical address.

GoDaddy → **My Products** → **gocca.co.in** → **DNS** → **Forwarding** → **Add
Forwarding**:

| Field | Value |
|---|---|
| Forward to | `https://www.gocca.in` |
| Redirect type | **Permanent (301)** |
| Settings | **Forward only** |

Also tick **Forward www** (or add the same rule for the `www` subdomain) so
`www.gocca.co.in` follows too.

Use 301, not 302 — it tells search engines the move is permanent and passes
ranking to `www.gocca.in`. Choose **Forward only**, not "Forward with masking":
masking hides the real URL inside a frame, which breaks bookmarking and is
penalised by search engines.

---

## Step 7 — Confirm

Once propagation completes, all four should land on the site over HTTPS:

- `https://www.gocca.in` ✓ — the real thing
- `https://gocca.in` ✓ — redirects to www
- `https://gocca.co.in` ✓ — 301 to www.gocca.in
- `https://www.gocca.in/team/` ✓ — check it returns a real 200, not a 404:
  ```bash
  curl -sI https://www.gocca.in/team/   | head -1   # expect 200
  curl -sI https://www.gocca.in/team    | head -1   # expect 301 to /team/
  curl -sI https://www.gocca.in/nope/   | head -1   # expect 404
  ```

---

## Why the URLs work

Each page is a real file in a real folder: `services/index.html` is served at
`/services/`. Nothing clever is involved, and `/team/` returns a genuine HTTP
**200**.

This is a change from the React version, which had no files for those paths.
It relied on GitHub serving `404.html` and letting JavaScript work out which page
you meant — so `https://www.gocca.in/team` returned **HTTP 404** to Google while
showing the right page to a human. That is fixed.

`404.html` is now what its name says: a real not-found page, served with a real
404 status, for URLs that genuinely do not exist.

One detail: GitHub Pages 301-redirects `/services` to `/services/`. That is why
every canonical tag, `og:url` and sitemap entry carries the trailing slash — a
slashless one would advertise a URL that redirects.

---

## Troubleshooting

**"Domain does not resolve to the GitHub Pages server"**
DNS hasn't propagated, or a leftover GoDaddy parking record is still there.
Re-check step 3a. `dig +short www.gocca.in` tells you the truth faster than the
GitHub UI.

**gocca.in doesn't redirect to www**
The four apex A records are missing or incomplete. The redirect only happens when
the apex points at GitHub *and* the custom domain is set to the www subdomain.

**Site loads but unstyled**
You are looking at the `github.io` URL before the domain is attached. The pages
link to `/assets/styles.css`, which resolves at the domain root but not under a
`/gocca-web/` subpath. It fixes itself at Step 4.

**Domain reverts to blank after a deploy**
`public/CNAME` is missing or wrong. It must read exactly `www.gocca.in` — no
scheme, no trailing slash.

**"Enforce HTTPS" is greyed out**
The certificate is still being issued; up to an hour is normal. If it's still
greyed out after 24 hours, remove the custom domain, save, re-add it, save. That
re-triggers provisioning.

**A page 404s**
The folder or its `index.html` is missing. Run `./check.sh` — it verifies every
internal link points at a file that actually exists.

**Changes pushed but the site is unchanged**
Hard-refresh — Pages caches HTML for about ten minutes. Check the repo's
**Deployments** panel to confirm the push actually published.

**Markdown files render as web pages, or a file has vanished**
`.nojekyll` is missing from the repo root.

---

## Reference

- [GitHub Pages custom domains](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Managing a custom domain — apex + www](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages limits and plan requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
