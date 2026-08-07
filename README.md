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

### 3. GitHub Pages

1. In the repo, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`. **Save**.
4. GitHub builds and publishes the site at
   `https://kgenticia-a11y.github.io/prof-portfolio/` — usually live within
   a minute or two. Re-visit **Settings → Pages** to confirm the green
   "Your site is live at…" banner before moving on.

### 4. Custom domain

Do these in order — attaching DNS before GitHub knows the domain risks a
dangling-CNAME takeover window.

1. **In GitHub first:** **Settings → Pages → Custom domain**, enter the
   domain (e.g. `krispinibyiza.com`) and **Save**. This writes the domain
   into the `CNAME` file at the repo root — keep that file, it must contain
   only the bare domain, nothing else.
2. **Then at the DNS provider:**
   - **Apex domain** (`krispinibyiza.com`): add four **A** records pointing
     to GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
     Optionally add the matching **AAAA** records for IPv6:
     ```
     2606:50c0:8000::153
     2606:50c0:8001::153
     2606:50c0:8002::153
     2606:50c0:8003::153
     ```
   - **`www` subdomain**: add a **CNAME** record pointing to
     `kgenticia-a11y.github.io`.
3. **Verify DNS propagation:**
   ```bash
   dig krispinibyiza.com +noall +answer
   ```
   Confirm the answers match the four A records above. DNS can take up to
   ~24–48 hours to fully propagate.
4. Once **Settings → Pages** shows a green check next to the custom domain
   (DNS verified), enable **Enforce HTTPS**.

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
