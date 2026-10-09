# Delivery outcomes

## Frontend-only scope
- The project is frontend-only: no application server, database, authentication, payment backend, or protected delivery implementation remains in the repository.
- The project contains fewer than 100 tracked files and uses the static Vite development/build workflow.

## Storefront and navigation
- Keep only the Home/Sales, Privacy Policy, Terms & Conditions, and Support routes.
- Make the compact WEB CLIENT OS identity and logo return to the homepage.
- Use separate routes for Privacy Policy, Terms & Conditions, and Support; no button scrolls to another section of the same page.

## Sales and pricing
- Preserve and use the supplied front cover at its original 2:3 proportions.
- Keep the lightweight responsive CSS 3D presentation with pointer interaction, image fallback, and reduced-motion behavior.
- Use ₹199 INR as the base price; show locale-based converted estimates elsewhere, cache rates briefly, label estimates, and fall back to ₹199 if conversion fails.
- Keep Buy Now as a clearly labeled Paddle placeholder; do not set up a payment page, process money, or grant paid access.

## Support and legal
- Keep Email Support at `mailto:dewifystores@gmail.com`, Call Support at `tel:+917057241449`, and WhatsApp at `https://wa.me/917057241449`.
- Keep readable Privacy Policy and Terms & Conditions content with actual current data practices and clearly marked missing business/legal details.

## Quality
- Validate semantic accessible UI, responsive layouts, reduced-motion behavior, exact contact destinations, route manifest, cover loading, placeholder purchase behavior, `pnpm check`, `pnpm test`, and `pnpm build`.
