# Cyber-Station UI: working rules

- **Font:** use **Gilroy** for all UI text, with no secondary or monospace font. Load it with `@font-face`
  blocks pointing to `../fonts/Gilroy-*.woff2` for mockups or `/fonts/Gilroy-*.woff2` (site/public/fonts) for the Next.js app. Do not load other web fonts.
- **Content:** redesigns use only the content visitors can see on the live site
  (https://cyberstation.brainstation-23.com/). Do not add or remove content: no new copy, icons that add
  meaning, or elements hidden on the live site (e.g. `data-pricing-hidden` buttons). Ask before adding anything.
- Each section lives in its own folder with `index.html`, `README.md` and `screenshots/`.
