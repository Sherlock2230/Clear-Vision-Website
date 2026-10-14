# Clear Visions Windscreens — website

Static website for Clear Visions Windscreens, Harare: windscreen fitment, hydraulics, auto parts and tyres.
Plain HTML, CSS and JavaScript — no build step. Hosted on Cloudflare (Workers static assets).

## Structure

| Path | What it is |
|---|---|
| `public/index.html` | Home — windscreen centre, catalogue, quote form |
| `public/hydraulics.html` | Clear Service Hydraulics Centre |
| `public/auto-parts.html` | Clear Auto Parts & Spares |
| `public/tyres.html` | Clear Quick Fitment Centre |
| `public/404.html` | Not-found page |
| `public/css/styles.css` | All styles (colours are variables at the top) |
| `public/js/config.js` | **Phone and WhatsApp number — edit here** |
| `public/js/catalogue.js` | **Windscreen prices and stock — edit here** |
| `public/js/quote.js` | Quote form → opens WhatsApp with the details filled in |
| `public/images/` | Logo and photos |
| `public/_headers` | Security and cache headers |
| `wrangler.jsonc` | Cloudflare config — serves the `public/` folder |

Only `public/` is published, so this README and the config files are never served.

## Before going live

- [ ] Replace the placeholder number `+263 77 123 4567` in `public/js/config.js`
- [ ] Add real prices for rear, door/quarter glass and panels in `public/js/catalogue.js` (they show "Price on request" until then)
- [ ] Add the trucks & buses range in `public/js/catalogue.js` (shows a "send us your details" message until then)
- [ ] Add photos: `images/hero.jpg` (technician fitting a windscreen) and `images/shop.jpg` (shop front) — see the `TODO` comments in `index.html`
- [ ] Add the street address in the "Visit" card
- [ ] Check the services listed on the hydraulics, auto parts and tyres pages

## Editing

- **Prices / stock:** in `catalogue.js`, edit the `FRONT` table. `"in"` = In stock, `"24h"` = Ready in 24h.
- **Header and footer** are repeated in each HTML page. If you change the menu or footer, change it in all five pages.

## Run locally

Open `public/index.html` in a browser, or for exact Cloudflare behaviour:

```bash
npx wrangler dev
```

## Deploy (Cloudflare)

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick this repo.
3. Leave the build command empty. Deploy command: `npx wrangler deploy` (Cloudflare fills this in from `wrangler.jsonc`).
4. Production branch: `main`.
5. After the first deploy: **Settings → Domains & Routes → Add custom domain**.

Every push to `main` redeploys automatically.

> If Cloudflare opens a pull request from a `cloudflare/workers-autoconfig` branch, this repo already has a `wrangler.jsonc`, so close that PR and delete the branch instead of merging it.
