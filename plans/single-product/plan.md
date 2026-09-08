# Single Product Plan

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Implement the Atelier Street product-detail page shown in the supplied reference: a public product route with an image gallery, product information, color and size selection, add-to-cart and wishlist actions, reassurance benefits, product details, and a “Complete the Look” recommendation row.

Reference: [Screenshot 2026-09-08 at 15.42.14.png](resources/Screenshot%202026-09-08%20at%2015.42.14.png)

The blue lines in the reference are treated as annotations/guides, not UI elements.

## Access and Security Requirements

- Product details are publicly viewable for guests and authenticated users.
- Do not expose account-only data in the public product payload.
- Add-to-cart and wishlist behavior must use an explicit server/session contract before claiming persistence; a fixture-backed visual implementation must not imply that an order or wishlist was saved when it was not.
- Validate product identifiers, selected variant values, and quantity at the server boundary when mutation endpoints are introduced.
- Never trust client-provided prices, availability, or product metadata for cart/order calculations.

## Key Architectural Decisions

- Use the existing public RootLayout and shared Header; do not duplicate navigation or the authenticated profile sidebar.
- Add a localized public product route using a stable product slug. Because no product domain currently exists, begin with a fixture-backed product lookup and keep the payload shaped for a future product model/query.
- Build the screen from separate React components: breadcrumb, media gallery, product purchase panel, variant selectors, reassurance benefits, product information sections, and recommendation row.
- Reuse the catalog product-card conventions for “Complete the Look” items, extracting shared types or presentation only where it removes real duplication.
- Use Wayfinder for product, catalog, cart, login, and future mutation links/actions; do not hardcode application URLs.
- Keep selected color and size state explicit, accessible, and ready to submit to a future cart/wishlist contract.
- Treat the supplied screenshot as a visual target: two-column desktop purchase area, narrow thumbnail rail, large product image, compact form controls, warm neutral palette, and responsive stacked mobile layout.

## Slices

1. [01-product-route-and-data-contract.md](slices/01-product-route-and-data-contract.md) — add the public localized product route and define the fixture-backed product, variants, benefits, detail sections, and recommendations payload.
2. [02-product-media-and-purchase-panel.md](slices/02-product-media-and-purchase-panel.md) — build the responsive media gallery, breadcrumb, product heading, price, description, and purchase panel shell.
3. [03-product-variants-and-actions.md](slices/03-product-variants-and-actions.md) — implement accessible color/size selection, add-to-cart state, wishlist action boundary, size chart, and reassurance benefits.
4. [04-product-details-and-recommendations.md](slices/04-product-details-and-recommendations.md) — add product details, material/care, fit/sizing content, and the reusable “Complete the Look” recommendation row.
5. [05-product-verification.md](slices/05-product-verification.md) — verify public access, variant state, mutation boundaries, accessibility, responsive layout, tests, generated routes, and build output.

## Verification Strategy

- Add feature coverage proving guests can view the localized product route and receive the expected Inertia product payload.
- Test an existing product slug and the not-found behavior for an unknown slug.
- Test that unsupported variant values are rejected once add-to-cart or wishlist endpoints are implemented; do not test client markup as a substitute for server validation.
- Run focused tests after each slice, `vendor/bin/pint --dirty --format agent` after PHP edits, and `npm run build` after frontend edits.
- Review the page at desktop, tablet, and mobile widths, including thumbnail keyboard navigation, selected variant focus states, disabled/unavailable choices, and accessible action labels.

## Risks / Prerequisites

- No product, variant, inventory, wishlist, or product-detail domain currently exists. Decide whether execution remains fixture-backed or introduces approved persistence.
- The existing cart page is fixture-backed and does not currently expose a product add endpoint. Add-to-cart must either remain a clearly bounded UI state or be paired with an approved cart mutation contract.
- Wishlist persistence and authentication behavior are not defined. The page may show a sign-in handoff for guests and an authenticated action only after the route/endpoint contract is approved.
- Product image assets are currently remote fixture URLs. Production readiness requires an approved media source and availability strategy.
