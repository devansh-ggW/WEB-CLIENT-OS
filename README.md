# WEB CLIENT OS storefront

A frontend-only React/Vite storefront for the **WEB CLIENT OS** digital field guide. The project intentionally contains only the public client, its assets, configuration, and documentation; it has no application server, database, authentication, payment backend, or protected ebook delivery.

## Run locally

```bash
pnpm install
pnpm dev
```

Build the static site with:

```bash
pnpm check
pnpm test
pnpm build
```

The generated static files are written to `dist/`. The project is intentionally kept under 100 tracked files and avoids the original server/database/UI starter scaffolding.

## Paddle setup (frontend-only)

Paddle.js is integrated for overlay checkout and localized price previews. This repository intentionally has no application server, database, API key, webhook receiver, or server-side order verification. Paddle client-side tokens are designed for public frontend use; **never put a Paddle API secret in this repository or frontend bundle**.

In GitHub, open **Settings → Secrets and variables → Actions → Variables** and create these repository variables:

- `VITE_PADDLE_CLIENT_TOKEN`: your Paddle **client-side token** (`test_...` for Sandbox or `live_...` for production).
- `VITE_PADDLE_PRICE_ID`: the active one-time price ID for WEB CLIENT OS.
- `VITE_PADDLE_ENVIRONMENT`: `sandbox` or `live`.

The workflow injects these values at build time. Because the client-side token and price ID are included in the published frontend, they are not secrets. Create a one-time price in Paddle with a base price of **₹199 INR**, enable the local currencies you want under Paddle currency settings, and use a token and price ID from the same environment. In Paddle, configure the default payment link and approve `webclientos.dewify.shop` as a checkout domain.

The storefront uses `Paddle.PricePreview()` to show Paddle's localized formatted subtotal instead of calculating an independent currency estimate. If the token, price ID, or preview is unavailable, the site falls back to ₹199 INR and tells the visitor checkout setup is incomplete.

## Deployment

The GitHub Actions workflow at `.github/workflows/deploy.yml` installs the locked dependencies, runs the TypeScript check, builds the Vite app, preserves the custom `CNAME`, and deploys `dist/` to GitHub Pages. In **Settings → Pages**, set the source to **GitHub Actions**. The workflow also publishes `404.html` as a fallback for the client-side routes.

## Digital delivery limitation

This is deliberately frontend-only. Paddle can host the checkout, but a static site cannot securely verify a transaction or protect a private ebook file on its own. Configure a suitable delivery method before taking real orders; a PDF placed in `client/public` is publicly downloadable by anyone who knows its URL. Do not advertise automatic protected delivery until it has actually been implemented and tested. Replace the legal placeholders with seller/controller details, refund policy, delivery rules, retention schedule, and applicable law before launch.

The supplied `FRONTCOVER.png` is preserved as `client/public/book-cover.png` at its original 2:3 proportions. `client/public/manus-routes.json` declares the four public routes.
