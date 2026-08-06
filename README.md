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
  favicon.svg            KI monogram, used as the site favicon
  og-image.png           Open Graph / Twitter card image
  krispin-resume.pdf      placeholder — swap for the real résumé
```

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

Deploy instructions are added in Batch 9.
