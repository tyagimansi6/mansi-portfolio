# Mansi Tyagi — Portfolio

Premium React portfolio rebuilt with Vite, Framer Motion, and React Icons. Branding and content from the original site are preserved.

## Tech stack

- React 19
- Vite
- CSS Modules + global design tokens
- Framer Motion
- React Icons

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   # Navbar, Hero, sections, ThemeToggle, etc.
  context/      # ThemeProvider
  data/         # All portfolio content & links
  hooks/        # Scroll, counters, mouse, in-view helpers
  pages/        # Home composition
  styles/       # CSS variables + global styles
public/         # Static PDFs, badge images
```

## Public assets to add

Place these under `public/`:

- `resume.pdf`
- `certificate.pdf`
- `lor.pdf`
- `assets/certificates/networking-basics-certificate.pdf`

The Cisco badge image is already at `public/assets/certificates/networking-basics.png`.

## Customize

Edit `src/data/content.js` for copy, links, and CodeChef (`site.codechef`).

Theme preference is saved in `localStorage` under `portfolio-theme`.
