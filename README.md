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

## Current purchase state

Buy Now is intentionally a **Paddle Checkout placeholder**. It opens an honest status notice and does not open a fake checkout form, process money, or grant ebook access.

Before real sales, connect Paddle Checkout externally or add a separate secure backend for seller verification, webhooks, idempotent order records, and protected ebook delivery. Do not place Paddle private credentials in this frontend bundle. Replace the legal placeholders with the seller/controller details, refund policy, delivery rules, retention schedule, and applicable law before launch.

The page uses ₹199 INR as the source price. Visitors outside India receive a locale-based estimate from a current Frankfurter reference rate when available; a short-lived session cache and safe ₹199 fallback prevent conversion failures from breaking the page.

The supplied `FRONTCOVER.png` is preserved as `client/public/book-cover.png` at its original 2:3 proportions. `client/public/manus-routes.json` declares the four public routes.
