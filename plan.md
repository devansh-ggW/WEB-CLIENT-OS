# WEB CLIENT OS — Frontend-only storefront plan

Build a compact static React/Vite storefront for WEB CLIENT OS. The final repository must stay under 100 tracked files and contain no application server, database, authentication, payment backend, or protected delivery implementation. Buy Now remains an explicit Paddle Checkout placeholder with no payment processing or client-side entitlement claim.

The supplied front cover remains the only product artwork and is stored as `client/public/book-cover.png` without recreation or distortion. The home page uses a lightweight CSS 3D stage with pointer tilt and a reduced-motion fallback. Currency display starts at ₹199 INR, detects a likely visitor currency from locale, requests a current reference rate, caches it briefly, labels converted values as estimates, and falls back safely to INR.

The visual system is premium editorial: warm near-white paper, ink-black typography, electric violet actions, fine rules, generous whitespace, and a split “field guide” composition. The wordmark is a compact OS glyph plus two-line label. Interaction is purposeful and light: hover states only lift useful actions, the cover responds to pointer movement, buttons use real routes or native support protocols, and reduced-motion users get a static presentation.

The frontend structure is intentionally small: `client/src/App.tsx` owns routes, `client/src/components/SiteChrome.tsx` owns shared chrome and metadata, `client/src/pages/` owns the four public experiences, `client/src/lib/` owns currency and checkout placeholder logic, and `client/public/` owns the cover, brand mark, and route manifest. `vite.config.ts`, `package.json`, `tsconfig.json`, and the root documentation provide the static toolchain and handoff notes.

Use the static Vite dev/build workflow. Validate with `pnpm check`, `pnpm test`, and `pnpm build`, and verify the four routes, exact support destinations, cover loading, pricing fallback, reduced motion, responsive layout, and placeholder purchase notice.
