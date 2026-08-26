# Pointing www.gocca.in at this GitHub repo

End-to-end: push the code, turn on GitHub Pages, change the DNS at GoDaddy, and
forward `gocca.co.in` across.

**Canonical address: `https://www.gocca.in`.** The bare `gocca.in` redirects to
it, and so does everything on `gocca.co.in`. One address, everywhere.

This guide assumes the GitHub account **`kouya-marino`** and the repo
**`gocca-web`**.

---

## Where this got to — resume here

**Status as of 27 Aug 2026: steps 1 and 2 are done. The next action is yours, at GoDaddy.**

| # | Step | State |
|---|---|---|
| 1 | Repo pushed, Pages on, Actions deploying | ✅ done — green, serving at `kouya-marino.github.io/gocca-web` |
| 2 | **GoDaddy DNS for gocca.in** | ⏳ **not started — do this next** |
| 3 | Enter `www.gocca.in` in Settings → Pages | blocked on step 2 |
| 4 | Tick Enforce HTTPS | blocked on step 3 |
| 5 | Forward `gocca.co.in` | can be done any time |
| 6 | Verify all four addresses | last |

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

**No — and you don't have to choose one.** GitHub Pages can publish from three
different sources:

| Source | What gets served | Fits this project? |
|---|---|---|
| Branch root (`main` → `/`) | Every file in the repo, as-is | ✗ — would serve `package.json` and `src/`, not the built site |
| Branch subfolder (`main` → `/docs`) | Whatever you commit into `docs/` | ✗ — means committing build output on every change |
| **GitHub Actions** | Whatever the workflow uploads | **✓ — this is what we use** |

This repo uses **GitHub Actions**. On every push to `main`,
`.github/workflows/deploy.yml` installs dependencies, runs the route check, runs
`npm run build`, and publishes the resulting `dist/` folder.

So: the build folder *is* what gets hosted — but you never commit it. `dist/` is
in `.gitignore` and gets rebuilt fresh on GitHub's servers each time. You only
ever commit source.

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
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

Don't pick a branch. Selecting "GitHub Actions" is what tells Pages to listen for
the workflow already in this repo.

Go to the **Actions** tab. You should see a *Deploy to GitHub Pages* run — wait
for the green tick, about a minute.

> **Before the domain is attached, the site will look broken** at
> `kouya-marino.github.io/gocca-web/`. That is expected: `vite.config.js` sets
> `base: '/'` because the real home is `www.gocca.in`, not a `/gocca-web/`
> subpath. It renders correctly the moment the domain is wired up. To preview at
> the github.io URL first, temporarily set `base` to `'/gocca-web/'` — and
> remember to change it back.

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

`public/CNAME` in this repo contains `www.gocca.in`, and Vite copies it into
`dist/` on every build.

To be clear about what does what: **the Settings box in Step 4 is what actually
sets the custom domain.** Verified on this repo — the first deploy shipped a
CNAME file in the artifact and the domain stayed unset until it was entered in
Settings. The file's job is the deploy *after* that: an Actions-published site
whose artifact has no CNAME file can have its custom domain silently dropped, so
keeping the file is what makes the setting stick.

So you need both. Set it in Settings once; leave `public/CNAME` in place forever.

If you ever change domains, edit `public/CNAME` **and** the Settings box. GitHub
may also commit its own `CNAME` to the repo root when you save — harmless, but
delete it and keep `public/CNAME` as the single source of truth.

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
- `https://www.gocca.in/team` ✓ — **press refresh on this one specifically.** It
  exercises the `404.html` fallback described below.

---

## How deep links survive on a static host

GitHub Pages has no server-side routing. Ask it for `/team` and it looks for a
file called `team`, doesn't find one, and serves `404.html`.

So `vite.config.js` includes a small plugin that copies `index.html` to
`404.html` at the end of every build. Pages serves that "404", the React app
boots, React Router reads the URL and renders the Team page. The visitor sees the
right page; the only cost is that the HTTP status is technically 404.

This is why `404.html` must not be removed from `dist/`, and why the
`spaFallback` plugin in `vite.config.js` shouldn't be deleted.

---

## Troubleshooting

**"Domain does not resolve to the GitHub Pages server"**
DNS hasn't propagated, or a leftover GoDaddy parking record is still there.
Re-check step 3a. `dig +short www.gocca.in` tells you the truth faster than the
GitHub UI.

**gocca.in doesn't redirect to www**
The four apex A records are missing or incomplete. The redirect only happens when
the apex points at GitHub *and* the custom domain is set to the www subdomain.

**Site loads but every stylesheet and script 404s**
`base` in `vite.config.js` doesn't match how the site is served. It should be
`'/'` for a custom domain.

**Domain reverts to blank after a deploy**
`public/CNAME` is missing or wrong. It must read exactly `www.gocca.in` — no
scheme, no trailing slash.

**"Enforce HTTPS" is greyed out**
The certificate is still being issued; up to an hour is normal. If it's still
greyed out after 24 hours, remove the custom domain, save, re-add it, save. That
re-triggers provisioning.

**`/team` works when clicked but 404s on refresh**
`404.html` is missing from the deployed output. Check the `spaFallback` plugin is
still in `vite.config.js` and that the Actions run succeeded.

**Changes pushed but the site is unchanged**
Check the **Actions** tab for a red run, then hard-refresh — Pages sets a
ten-minute cache on HTML.

---

## Reference

- [GitHub Pages custom domains](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Managing a custom domain — apex + www](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages limits and plan requirements](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
