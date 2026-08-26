# Gocca Global Services — www.gocca.in

Plain HTML and CSS. No build step, no npm, no dependencies. **The repo is the
website** — the file you edit is the file that gets served.

**Deploying to the domain? → [DOMAIN-SETUP.md](./DOMAIN-SETUP.md)**

---

## Contact details are temporary

The site currently uses **prashantrawatmailbox@gmail.com** and WhatsApp
**+91 91989 13454**. Both are stopgaps — `./check.sh` keeps reminding you.

To change either, find-and-replace across the folder:

```bash
grep -rl 'prashantrawatmailbox@gmail.com' . --include='*.html' \
  | xargs sed -i '' 's/prashantrawatmailbox@gmail.com/YOUR@ADDRESS/g'
```

WhatsApp numbers are country code then number, **no `+`, no spaces, no dashes**:
`wa.me/919198913454`.

Two reasons to move off the Gmail before the site gets promoted:

1. **A personal Gmail on a business site reads as less established** to a company
   placing a bulk gifting order. You already have email running on `gocca.in`, so
   a mailbox there costs nothing to set up.
2. **The address is scraped.** It sits in the public HTML in eleven places and
   the repo is public. Expect spam.

## Activate FormSubmit before telling anyone

Submit each form once yourself. FormSubmit emails that address a confirmation
link. **Until you click it the forms appear to work and every enquiry is silently
discarded** — the visitor sees the thank-you page and nothing reaches you.

Activation also gives you an alias URL (`https://formsubmit.co/el/xxxxxx`). Swap
it into both `action=` attributes; it keeps the address out of the public HTML
and is what point 2 above is about.

---

## Editing it

Nothing to install, nothing to run. Open a `.html` file, change the text, save,
commit, push. Live in about a minute.

| Task | What you do |
|---|---|
| Fix a typo | Open that page's `index.html`, find the sentence, fix it. One file. |
| Change a service description | `services/index.html` — and check `index.html`, which shows the short version too. |
| Add a team member | Copy a whole `<li class="team-member">` block in `team/index.html`; change name, role, bio and initials. |
| Change a gift category | `corporate-gifting/index.html` |
| Change the email or number | Find-and-replace across the folder (above), then `./check.sh`. |
| Add a nav item | Add one `<li>` to the nav list, paste the shared header into the other six files, create the new folder with an `index.html`. Then `./check.sh`. |

### Seeing it before you push

Opening a file straight from Finder shows unstyled text — pages use
root-relative paths like `/assets/styles.css`, which only resolve over HTTP. From
the project folder:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

`ruby -run -e httpd . -p 8000` works too. If neither runs on your machine, skip
it — push and look at the live site. The site does not need them.

### The checker

```bash
./check.sh
```

Pure `sh` and `grep`, no installs. It verifies every page has exactly one `<h1>`;
that each page's canonical URL points at itself rather than at whichever page you
copied it from; that every internal link resolves to a real file; that the nav is
complete and the right item marked current; that the sitemap matches what is on
disk; and that no owner-facing note has leaked into a visitor-facing page.

It is not a build step. Delete it and the site still works — it just stops
telling you when you have made one of those mistakes.

---

## How it is put together

```
index.html                    →  /
services/index.html           →  /services/
corporate-gifting/index.html  →  /corporate-gifting/
team/index.html               →  /team/
work-with-us/index.html       →  /work-with-us/
thank-you/index.html          →  /thank-you/   where both forms land
404.html                      →  any unknown URL

assets/styles.css     the whole stylesheet, one file, with a table of contents
assets/nav.js         ~25 lines. The only JavaScript on the site.
assets/og-image.jpg   the social-share card
assets/illustrations/ hand-drawn SVG line art — see below
assets/favicon.svg    assets/logo-mark.svg
apple-touch-icon.png  iOS home-screen icon — must be PNG; iOS ignores SVG
CNAME  robots.txt  sitemap.xml  .nojekyll  check.sh
```

### The shared header and footer

Every page carries the same header and footer, marked in the HTML with
`SHARED HEADER` / `SHARED FOOTER` comments that name the other six files to paste
into. That duplication is the deliberate cost of having no build step.

It is smaller than it looks: the desktop bar and the mobile menu are **one list
styled two ways**, not two lists, so a nav change is one edit per file rather
than three. `./check.sh` tells you when a page falls out of sync.

### The illustrations

`assets/illustrations/` holds ten hand-drawn SVGs, about 9KB for the lot. They
are deliberately **illustrations, not photographs**: on a gifting site a photo
reads as an offer, and showing a hamper you cannot actually supply is a
conversation you do not want. Nobody mistakes a line drawing for a catalogue
item.

They follow one system, and anything added should too:

- 2px stroke with `vector-effect="non-scaling-stroke"`, so the line stays the
  same weight whatever size it renders at
- ink `#1e1e1e` for the objects, accent `#00a0dc` for **one idea per drawing** —
  the diya flame, the repeated artwork mark, the name tag, the ribbon
- no fills, no gradients, no perspective, no text inside the artwork

To swap one for a real photograph later: the gift cards use `.cat-art`, which
sits inside the tile with padding. A photo should use `.cat-image` instead,
which fills the slot edge to edge. Both classes already exist.

### Class names

Every class is prefixed by where it belongs — `site-`, `section-`, `btn`,
`form-`, `cat-` (gifting), `team-`, `svc-` (services), `nf-` (404). Add one the
same way, in the matching numbered section of `assets/styles.css`. The prefixes
exist because a dozen class names collided when the old per-component
stylesheets were merged into one file.

### The JavaScript

`assets/nav.js` does one thing: flip `aria-expanded` on the menu button. The
stylesheet does the showing and hiding. That is the whole design — the menu's
state lives in one place, and it is the same attribute a screen reader reads.

The nav is **visible by default** and only collapses behind the hamburger once
the page's inline `<script>` marks the document as scripted. If `nav.js` ever
fails to load, a phone gets a plain list of links rather than a button that does
nothing — which is exactly how the 2020 site was broken.

---

## The forms

Both post to [FormSubmit](https://formsubmit.co) — free, no account, and it takes
file attachments up to 10MB, which the free tiers of Formspree and Web3Forms do
not. No JavaScript involved; they are native HTML form posts.

- `work-with-us/index.html` — careers and general enquiries, with a CV upload
- `corporate-gifting/index.html` — gifting enquiry: occasion, quantity, budget,
  date needed, delivery cities, plus an attachment for a brief or logo

The hidden fields matter, so do not delete them:

| Field | Why |
|---|---|
| `_next` | Where the visitor lands after submitting. Without it they land on FormSubmit's own branded page. Must be an absolute URL. |
| `_subject` | Which form it came from, so you can filter in your mail client. |
| `_honey` | Spam trap. Real people never fill a hidden field; bots do. |
| `_captcha` | Set `false`. Flip to `true` if spam starts arriving. |
| `enctype="multipart/form-data"` | Required for uploads. Without it the file is dropped with no error. |

The email field must be named exactly `email` — that is what FormSubmit uses to
set Reply-To, and without it you cannot reply to an applicant.

**Once activated,** consider swapping the visible address for the alias
FormSubmit gives you (`https://formsubmit.co/el/xxxxxx`). This repo is public and
the pages are crawled, so a plain address in the HTML will be scraped.

**If FormSubmit ever disappears:** the WhatsApp and email links sit beside every
form on purpose. Swap the `action=` line for Formspree or Web3Forms; nothing else
changes.

---

## Copy that still needs your review

The 2020 site left large sections as Lorem Ipsum. Rather than put placeholder
Latin on a live domain, those gaps were filled with drafted copy written in the
voice of the parts that were finished.

**Original, kept as-is:** the tagline and strapline; the "We excel at" paragraph;
all three service names and summaries; the value names; Ankush Sharma's role and
bio; Harish S.A.'s testimonial; the "200 brands worldwide" line.

**Drafted — please read and correct:**

| Where | What |
|---|---|
| `services/index.html` | The longer paragraph under each of the three services |
| `index.html` | All four value descriptions, and the name *Transparency* for what the old site left as "Fourth Character" |
| `team/index.html` | Prashant Rawat's bio |
| `index.html` | Harshit Arora's testimonial |
| `corporate-gifting/index.html` | **Everything.** The old site never mentioned gifting. |

Also confirm:

- **Testimonials name two real people.** Check both are happy to be quoted.
- **The address** reads "Indirapuram, Ghaziabad, Uttar Pradesh, India". The 2020
  site said *"Uttharakhant, Ahimsakhant, Indirapuram"*, which looked like
  leftover placeholder text. Correct it or remove the line.
- **A third team member** was "Third Person / Human Resource" on the old site,
  with no real name. Not carried over — add an `<li>` when there is someone.
- **No photographs anywhere.** The site uses line illustrations instead, which
  make no claim about products. Real photographs of hampers and branded items
  you have actually delivered would still beat them — the slots are ready.

### Corporate gifting — 25 things to confirm

That page is written to be **true but incomplete**. It states no price, no
minimum order quantity, no lead time, no delivery coverage, no client name and no
order volume, because none are confirmed. Some sentences are hedged on purpose:
Approval says a sample "**where one is warranted**"; Delivery says only "one
address **or many**". Replace the hedges once you know the real answers, not
before.

**Nothing on that page promises anything you have not confirmed. Keep it that
way — an unmet gifting promise costs a client, not just a correction.**

*Before the page is finished* — the seven a buyer asks in their first email:
minimum order quantity · lead times in working days, quoted from artwork approval
not from enquiry · pricing, or say plainly it is quote-only · delivery coverage,
and whether you ship to individual home addresses · whether samples are available
and chargeable · a one-line replacement policy for damaged or short deliveries ·
whether food hampers are offered at all *(all edible examples were removed
pending FSSAI and sourcing answers)*.

*Commercial:* payment terms · whether purchase orders and credit terms are
accepted · **GST registration and invoicing** — an Indian corporate buyer cannot
raise a PO without it, and this belongs in visible copy, not only here.

*Artwork:* revision rounds included · accepted file formats · which customisation
methods genuinely exist (screen print, UV, embroidery, engraving, foil) · which
packaging and personalisation options exist · personalisation limits.

*Operations:* the last date to place festival orders, and who updates it each
year · whether kit specs and artwork are actually kept for repeat orders ·
whether a post-delivery debrief happens.

*Proof:* photographs of past hampers and branded items — the page has no proof of
work at all, and gifting is a visual sell · a catalogue or lookbook · any figure
you will stand behind, and **leave it out rather than estimate** · whether client
names or logos may be shown, with written permission from each.

---

## What changed from the 2020 site

- **The mobile menu works.** The old hamburger's target markup had been deleted,
  so tapping it on a phone did nothing at all.
- **Search engines and WhatsApp see real content.** The first rebuild was a React
  app that served an empty `<div>` and filled it in with JavaScript, so every
  page shared the homepage's social preview. Each page now has its own title,
  description and share card in the served HTML.
- **No jQuery, no Bootstrap, no icon fonts, no React.** The 2020 site loaded
  jQuery 1.10.2, all of Bootstrap 3 and two icon fonts to draw three icons.
  Those are now inline SVG.
- **Stock photography removed.** The old portfolio grid, testimonial avatars and
  partner logos were template images unrelated to Gocca.
- **Corporate gifting is a new section.** The old site never mentioned it.
- The accent `#00a0dc` carries over from the old stylesheet, with a darkened
  variant for text because the original fails WCAG AA contrast on white.

The React version stays in git history, tagged `v1-react`, if ever needed.
