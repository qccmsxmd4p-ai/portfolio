# Youssef El Hafiane — Portfolio Website

A single-page animated portfolio site. Pure HTML/CSS/vanilla JS, no build step, no dependencies to install.

## Project structure

```
portfolio-site/
├── index.html      Main page — structure and content
├── vercel.json     Vercel config (clean URLs)
├── css/
│   └── style.css   All styles and animations
├── js/
│   └── main.js     Cursor, particle canvas, scroll reveals, skill bars
└── README.md
```

## Run locally

Just open `index.html` in a browser — no server required. Some browsers restrict certain
features on the `file://` protocol, so for the smoothest experience serve it locally instead:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy

This is a fully static site, so any static host works. A few common options:

**Vercel (via GitHub)**
Push this folder's contents to a GitHub repo (with `index.html` at the root), then on vercel.com:
Add New → Project → Import the repo. Settings: Framework Preset `Other`, Build Command empty,
Output Directory empty, Install Command empty, Root Directory `./`. Click Deploy.

**Netlify (drag-and-drop)**
Drag the project folder onto the Netlify dashboard — it deploys automatically, no configuration needed.

**GitHub Pages**
1. Push this folder's contents to a GitHub repo (root of the repo, or a `/docs` folder).
2. In the repo settings, enable Pages and point it at the branch/folder.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Any other static host** (Cloudflare Pages, Firebase Hosting, S3 + CloudFront, etc.)
Upload the contents of this folder as-is — `index.html` at the root, `css/` and `js/` alongside it.

## Editing content

All text content (experience, projects, education, skills, contact info) lives directly in
`index.html`. Colors, fonts and animation timing are defined as CSS custom properties at the
top of `css/style.css` (the `:root` block) — change a value there to restyle the whole site.

## Notes

- Google Fonts (Syne, DM Sans) are loaded via CDN `<link>` tags in `index.html` — an internet
  connection is needed for fonts to load (they fall back to system sans-serif otherwise).
- No external JS libraries are used — the particle canvas, cursor, and scroll animations are
  all hand-written in `js/main.js`.
