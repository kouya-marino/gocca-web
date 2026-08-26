# Gocca Global Services — www.gocca.in

Marketing site for Gocca, rebuilt from the 2020 PHP/Bootstrap original as a
static Vite + React app deployed to GitHub Pages.

**Deploying to www.gocca.in? → [DOMAIN-SETUP.md](./DOMAIN-SETUP.md)**

---

## Running it

Requires Node 20 or newer (`.nvmrc` pins 22; CI uses current LTS).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Server-renders every route and asserts each has exactly one `<h1>` |

`npm run check` runs in CI before every deploy. It is deliberately small — it
catches broken imports, components that throw, and heading-structure mistakes,
which are the failures most likely to ship unnoticed on a site with no tests.

---

## Where things live

```
public/            Copied verbatim into dist/ — CNAME, favicon, robots, sitemap
src/
  data/            All site copy. Edit here, not in components.
  components/      Reusable pieces (Header, Footer, Section, Button, …)
  pages/           One file per route
  styles/global.css  Design tokens + reset
scripts/           The route check
.github/workflows/ Build-and-deploy pipeline
```

**Content lives in `src/data/`.** Changing a service description, a team bio or
the contact address means editing a plain JavaScript object — no JSX, no
components. That is the one structural decision worth preserving if the site
grows.

Styling uses **CSS Modules** (`Component.module.css`), scoped per component, with
shared tokens as custom properties in `src/styles/global.css`. No CSS framework,
no utility classes, no preprocessor.

### Routes

| Path | Page |
|---|---|
| `/` | Home — hero, services, values, testimonials |
| `/services` | The three services in detail |
| `/corporate-gifting` | Gifting categories, process, and its own enquiry form |
| `/team` | Team |
| `/work-with-us` | Careers/general Google Form + contact details |
| anything else | 404 |

---

## Connecting the two contact forms

There are **two** Google Forms, because the audiences need different fields — a
job applicant and a company ordering 400 Diwali hampers have nothing in common.
Both pages render a friendly fallback showing your email address until a form is
connected, so the site is safe to deploy before either exists.

| Page | Config key in `src/data/site.js` | Purpose |
|---|---|---|
| `/work-with-us` | `googleFormEmbedUrl` | Careers / general enquiry |
| `/corporate-gifting` | `giftingFormEmbedUrl` | Gifting enquiry |

For each one:

1. Build the form at [forms.google.com](https://forms.google.com).
2. In the form: **Send** → the **`< >`** (embed HTML) tab.
3. Copy the value of the `src="..."` attribute only — it ends in
   `/viewform?embedded=true`.
4. Paste it into `src/data/site.js`:

   ```js
   giftingFormEmbedUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true',
   ```

5. Adjust the matching `…Height` value until the form doesn't scroll inside its
   own frame.

Responses collect in each form's linked Google Sheet. Turn on **Settings →
Responses → Get email notifications for new responses** on both, so submissions
actually reach you.

### What to ask on the gifting form

The enquiry is useless without these, and asking up front saves a round of
emails:

- Company name and contact person
- **Occasion** (Diwali, onboarding, anniversary, client gift, other)
- **Quantity** — the single most important field
- **Budget per unit** — offer ranges rather than a free-text box
- **Delivery date** the gifts must arrive by
- **Branding needed?** (logo printing / embroidery / custom packaging / none)
- Delivery city or cities, and whether it is one address or many
- Anything else

For the careers form on `/work-with-us`, a File upload question handles resumes —
note that Google requires respondents to be signed in to a Google account to
upload a file.

---

## Copy that needs your review before launch

A large part of the 2020 site was never finished — several sections were still
Lorem Ipsum. Rather than carry placeholder Latin onto a live domain, those gaps
were filled with drafted copy written in the voice of the sections that *were*
complete. **Every drafted block is marked `// DRAFT` in the source.**

Original copy, kept as-is:

- Tagline, strapline, and the "We excel at" paragraph
- All three service names and summaries — Configurations, Statistics, Connectivity
- The value names — Reliability, Innovation, Support
- Ankush Sharma's role and bio
- Harish S.A.'s testimonial
- The "200 brands worldwide" mission line

Drafted by me — please read and correct:

| Where | What was drafted |
|---|---|
| `src/data/services.js` | The longer `detail` paragraph on each of the three services |
| `src/data/values.js` | All four value descriptions, and a name for the unnamed "Fourth Character" (chose *Transparency*) |
| `src/data/team.js` | Prashant Rawat's bio |
| `src/data/testimonials.js` | Harshit Arora's quote |
| `src/data/gifting.js` | **Everything.** The old site never mentioned gifting, so the entire page is drafted — see the section below. |

Decisions you should confirm:

- **`site.email` is a placeholder** (`hello@gocca.in`). The old site posted to a
  personal Gmail address; putting that on a business domain is your call. You'll
  need to set up email on the domain, or substitute an address you already have.
- **`site.location`** — the old site read *"Uttharakhant, Ahimsakhant,
  Indirapuram"*, which looks like leftover placeholder text. It currently says
  "Indirapuram, Ghaziabad, Uttar Pradesh, India". Correct it or set the field to
  `null`; the footer and contact page both handle it being absent.
- **Testimonials name two real people.** Confirm both are happy to be quoted
  before this goes live.
- **The third team member** ("Third Person / Human Resource" on the old site) is
  commented out in `src/data/team.js` rather than invented. Uncomment and fill in
  when there's a real person.
- **No team photos.** Both members render as monogram tiles. To add a real photo:
  drop the file into `src/assets/`, import it at the top of `src/data/team.js`,
  and set that member's `photo` to the import. `Portrait` crops to a 7:9 portrait
  ratio, so supply at least 420×540.
- The old footer read *"Copyright - BEL CRL © Ghaziabad"*, which appears to be
  leftover from another project. It now reads "© Gocca Global Services".

---

## Corporate gifting — facts to confirm

`src/data/gifting.js` is **entirely drafted copy**. The 2020 site said nothing
about gifting, so unlike everywhere else in `src/data/` there was no original
wording to preserve — it was written from the four categories you confirmed and
nothing else.

It is deliberately written to be *true but incomplete*: it states no prices, no
minimum order quantities, no lead times, no delivery coverage, no client names
and no order volumes, because none of those are confirmed. Several sentences are
hedged on purpose — the Approval step says "a sample **where one is warranted**"
and the Delivery step says only "one address **or many**" precisely because the
underlying capability is unknown. Once you answer the questions below, those
hedges should be replaced with the real thing.

**Nothing on the page currently promises anything you have not confirmed. Keep it
that way — an unmet gifting promise costs a client, not just a correction.**

### Before the page can be called finished

These are the questions an HR or admin buyer asks in their first email, and the
page currently dodges all of them:

1. **Minimum order quantity** — per category, or state plainly that there is none.
2. **Lead times** in working days, per category. Quote them *from artwork approval*, not from enquiry, or you'll be held to the wrong clock. Add a longer festival-season figure.
3. **Pricing** — indicative budget bands per head, or state plainly that it's quote-only.
4. **Delivery coverage** — Delhi NCR only, selected states, or pan-India? And is dispatch to individual employee home addresses offered at all, at what cost?
5. **Samples** — can you send one before a bulk order? Chargeable? Adjusted against the order?
6. **Replacement and damage policy** — one line on what happens if pieces arrive broken or a delivery is short.
7. **Food hampers** — are sweets and dry fruit offered? If so: sourcing, shelf life, FSSAI. *All edible examples were removed from the page until this is answered.*

### Commercial terms

8. **Payment terms** — advance percentage, balance on dispatch, accepted modes.
9. **Purchase orders and credit terms** — accepted or not?
10. **GST registration and invoicing.** An Indian corporate buyer cannot raise a PO without it. This belongs in visible body copy, not just here.

### Artwork and personalisation

11. Rounds of artwork revision included before charges apply.
12. Accepted artwork file formats.
13. Which customisation methods genuinely exist — screen print, UV print, embroidery, laser engraving, foil — and which categories each applies to.
14. Which packaging and personalisation options genuinely exist — branded outer box, custom sleeve, printed greeting card, individual name tags.
15. Personalisation limits — max characters for name printing, number of logo colours, which items can't be personalised at all.

### Operations

16. Last date to place Diwali / New Year orders, and **who updates it each year**.
17. Are kit specifications and approved artwork actually retained for repeat orders, and for how long? The employee gifting blurb is written around this being possible.
18. Does a post-delivery debrief happen? If yes it's worth a line on the page; if no, leave it out.

### Site configuration

19. `giftingFormEmbedUrl` in `src/data/site.js` — until it's set, the page falls back to showing your email.
20. A real gifting enquiry email and a phone or WhatsApp number. Bulk gifting enquiries rarely start over email — `hello@gocca.in` is still a placeholder.
21. The physical packing or warehousing address to show, replacing the 2020 placeholder in `site.location`.

### Proof of work

22. **Photographs of past hampers, kits and branded items.** The page currently carries no proof of work at all, and gifting is a visual sell. Each category card has a photo slot ready — see the header comment in `src/data/gifting.js`.
23. A catalogue or lookbook to link, if you have one.
24. Any figure you're willing to stand behind — founding year, orders fulfilled, companies served. **Leave them out rather than estimate.**
25. Whether existing client names or logos may be shown — and get written permission from each company first.

---

## What changed from the 2020 site

- **The mobile menu works.** The old site had a hamburger button whose target
  markup had been deleted, so tapping it on a phone did nothing at all.
- **All photography removed.** The old portfolio grid, testimonial avatars and
  "partner" logos were template stock images unrelated to Gocca. The site now
  ships with no raster images at all — every team member renders as a monogram
  tile, and the only graphics are inline SVG.
- **The logo is now SVG**, redrawn from the original JPEG — sharp at any size,
  transparent, and it inverts for the dark footer.
- **No jQuery, no Bootstrap, no icon fonts.** The old site loaded jQuery 1.10.2
  (2013), all of Bootstrap 3, Font Awesome and a second icon font — to draw three
  icons. Those are now six inline SVG paths.
- **Contact forms are Google Forms** rather than a PHP `mail()` script. GitHub
  Pages is a static host and cannot run PHP.
- **Corporate gifting is a new page**, not a port. The 2020 site never mentioned
  that side of the business at all.
- The accent colour `#00a0dc` is carried over from the old stylesheet, with a
  darkened variant (`--accent-ink`) for text, because the original fails WCAG AA
  contrast on white at ~3:1.

### Not carried over

The old folder also contained an unrelated memory card game (`gocca/memory/`),
an empty `DatabaseConnection.txt`, and two empty directories named
`index - Copy.html` / `index - Copy.php`. None of it is here. The original is
untouched at `~/Workspace/WindowsLaptop/Gocca/GOCCA` if you ever need it.

---

## Stack

React 19 · React Router 7 · Vite 7 · CSS Modules. Three runtime dependencies
total.
