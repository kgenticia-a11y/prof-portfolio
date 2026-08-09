# Krispin Ibyiza — Portfolio

A hand-written static personal portfolio for Krispin Ibyiza (Amherst College, Physics '27).
No frameworks, no build step — just semantic HTML, modern CSS, and a little vanilla JavaScript.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html   styles.css   script.js
robots.txt   sitemap.xml   404.html   CNAME
/assets/
  headshot.jpg           profile photo (placeholder — see below)
  favicon.svg            KI monogram, used as the site favicon
  og-image.png           Open Graph / Twitter card image
  krispin-resume.pdf      placeholder — swap for the real résumé
```

### Update your photo

To change the profile picture, replace `assets/headshot.jpg` with your own
file using the same filename (or update the `src` in `index.html`).
Recommended: square, at least 600×600px. Rectangular images are handled via
`object-fit: cover` so they frame cleanly without distortion.

All theme values (colors, fonts, spacing, radii, motion durations) live in
`:root` in `styles.css` — a `[data-theme="dark"]` variant is scaffolded
there too, ready to switch on without touching any markup.

## Accessibility & performance

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content
  link, and a visible focus style on every interactive element.
- All motion (scroll reveals, count-up, hover transitions) is disabled
  under `prefers-reduced-motion: reduce`.
- No JS framework, one Google Fonts request, no render-blocking assets
  beyond the stylesheet and font link.

## Content notes

Anywhere the brief didn't supply a confirmed fact (a headshot, a résumé
file, LinkedIn post links, per-metric context, the graduation year), the
markup carries a visible `<!-- TODO: ... -->` comment instead of an
invented detail — search the HTML for `TODO` to find every open item.

## Deploy

This is a static site — no build step. It deploys as-is to GitHub Pages,
Netlify, or Cloudflare Pages.

### 1. Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

### 2. Repo

Already done for this project: the site lives at
[`kgenticia-a11y/prof-portfolio`](https://github.com/kgenticia-a11y/prof-portfolio),
pushed to `main`. (For a fresh copy elsewhere: `git init`, commit, create a
GitHub repo, `git push -u origin main`.)

### 3. GitHub Pages (automated)

Deployment is handled by the GitHub Actions workflow at
`.github/workflows/deploy-pages.yml`. It runs on every push to `main`,
turns Pages on automatically (`enablement: true`), and publishes the repo
root as-is — **no manual Settings → Pages toggle is needed.**

- Watch a run under the repo's **Actions** tab. When the `Deploy to GitHub
  Pages` job is green, the site is live.
- Before the custom domain resolves, the default URL is
  `https://kgenticia-a11y.github.io/prof-portfolio/`.

### 4. Custom domain — `krispinibyiza.ksystems.live`

The repo already contains a `CNAME` file with `krispinibyiza.ksystems.live`,
so GitHub is told about the domain on the next deploy. The **one remaining
step is DNS**, which must be done at whoever manages `ksystems.live`:

1. **Add a DNS record** for the subdomain (this is a subdomain, so it's a
   single **CNAME** record — *not* the four apex A-records):

   | Type  | Name (host)     | Value / Target              |
   |-------|-----------------|-----------------------------|
   | CNAME | `krispinibyiza` | `kgenticia-a11y.github.io.`  |

   (Some DNS panels want the full `krispinibyiza.ksystems.live` in the Name
   field; others want just `krispinibyiza`. Both mean the same host.)

2. **Verify propagation:**
   ```bash
   dig krispinibyiza.ksystems.live +noall +answer
   ```
   You should see a CNAME pointing at `kgenticia-a11y.github.io`. DNS can
   take anywhere from a few minutes to ~24–48 hours.

3. Once **Settings → Pages** shows the green "DNS check successful" next to
   the custom domain, enable **Enforce HTTPS**. GitHub provisions the TLS
   certificate automatically.

> Do the DNS step *after* the `CNAME` file is in the repo (it already is).
> Pointing DNS at GitHub Pages before the domain is claimed in the repo can
> open a brief subdomain-takeover window.

### Alternatives: Netlify / Cloudflare Pages

Since this is a plain static build, either works identically to GitHub
Pages, with a comparable one-click custom-domain flow:

- **Netlify**: connect the repo, leave build command empty and publish
  directory as `/` (repo root), deploy. Then **Site settings → Domain
  management → Add a custom domain** — Netlify issues its own DNS
  instructions (or use Netlify DNS directly) and provisions HTTPS
  automatically once verified.
- **Cloudflare Pages**: connect the repo, leave the build command empty
  with `/` as the output directory, deploy. Then **Custom domains → Set up
  a custom domain** in the Pages project — if the domain's DNS is already
  on Cloudflare, the CNAME/A records and HTTPS are handled automatically.

<!-- TODO: Krispin to pick and confirm the actual custom domain before following the DNS steps above. -->
