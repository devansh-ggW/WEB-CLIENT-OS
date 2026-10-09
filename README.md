# WEB CLIENT OS storefront

A lightweight frontend-only static storefront for the WEB CLIENT OS ebook. The root index.html is a ready-to-serve website for GitHub Pages branch publishing, with separate privacy.html, terms.html, and support.html pages. The React/Vite app remains under client/ and can also be published using GitHub Actions.

## Publish on GitHub Pages

In Settings → Pages, choose one:
- Deploy from a branch → main → /(root) to serve the standalone HTML storefront; or
- GitHub Actions to build and deploy the React/Vite app from the existing workflow.

The root HTML site and Vite app share the cover at client/public/book-cover.png.

## Paddle setup for the standalone root site

Edit assets/site-config.js and set:
- paddleClientToken: your Paddle client-side token.
- paddlePriceId: the active one-time price ID for WEB CLIENT OS.
- paddleEnvironment: sandbox while testing, then live.

These client-side values are public by design. Never add a Paddle API secret to browser code. Create a one-time price with a ₹199 INR base, enable localized pricing in Paddle, set the default payment link, and approve webclientos.dewify.shop as a checkout domain. The page uses Paddle.js PricePreview() and Checkout.open().

The GitHub Actions/Vite version reads VITE_PADDLE_CLIENT_TOKEN, VITE_PADDLE_PRICE_ID, and VITE_PADDLE_ENVIRONMENT from repository Actions variables during build.

## Local preview

The root static site can be opened directly or served with any static file server. For the React/Vite app:

    pnpm install
    pnpm check
    pnpm test
    pnpm build
    pnpm dev

## Digital delivery limitation

Paddle hosts checkout, but a static frontend cannot independently verify transactions or protect a private ebook PDF. Configure and test a suitable delivery method before accepting live orders; a PDF placed in a public repository can be downloaded by anyone who knows its URL. Replace the marked legal placeholders with real seller/controller details, refund policy, delivery rules, retention details, and applicable law before launch.
