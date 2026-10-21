# AGENTS.md — AIMA

## What this is

Single-page landing site for AIMA, a Mexican jewelry brand (stainless steel 316L with gold/silver PVD coating). React 18 + Vite 6 + Tailwind CSS v4, TypeScript strict, Spanish (`lang="es"`).

## Commands

```bash
npm run dev          # Vite dev server on port 5173
npm run build        # production build → dist/
npm run preview      # preview production build
npm run typecheck    # tsc --noEmit (no lint or test scripts exist)
```

No test framework, no linter, no formatter configured. `typecheck` is the only verification step.

## Architecture

- `landing.tsx` — the entire app. Single file, ~390 lines. Contains all components, styles (CSS-in-JS block), product data, and design tokens.
- `main.tsx` — entry point, renders `<App />` from `landing.tsx`.
- `index.html` — minimal shell (`<div id="root">`).
- `index.css` — only `@import "tailwindcss"`.
- `manual-aima.html` — brand manual (design tokens, copy voice, tone rules).
- `prompts-imagen.html` — image generation prompts for all site images.
- `RENATA-description.md` — AI character bible for image generation (model Renata Solís).

## Images

- Place `.jpg` files in `public/img/`.
- No manifest to maintain — `landing.tsx:17` derives the URL from the filename (`/img/<name>.jpg`). If the file is missing, the `<img>` hides itself and the finish gradient shows underneath.
- Prompts for each image are in `prompts-imagen.html`.

## Brand rules (from `landing.tsx:6-11`)

- "AIMA" is the **only** word in uppercase across the entire page.
- Zero accent color — the only color comes from the metal finish of the piece.
- Single easing curve for all transitions (`cubic-bezier(.76,0,.24,1)`).
- "always on" does **not** apply to pearl pieces — they are the one item you take off.

## Tailwind v4 gotcha

Tailwind is loaded via `@tailwindcss/vite` plugin (not PostCSS). No `tailwind.config.js` exists. All customization is in the CSS custom properties block inside `landing.tsx:58-100`. If you add Tailwind classes that need config, the place to look is that inline `<style>` block, not a separate config file.

## tsconfig

Only `*.tsx` and `*.ts` in the root are included (`"include": ["*.tsx", "*.ts"]`). Files in `public/` or subdirectories are not typechecked.

## References

- Brand manual: `manual-aima.html`
- Image prompts: `prompts-imagen.html`
- Character bibles: `RENATA-description.md` (and `CLEO-description.md` if it exists)
- Image registry doc: `public/img/README.md`
