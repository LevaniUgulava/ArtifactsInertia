# Slice 05 — Product Verification

## Outcome

Confirm the product-detail page is publicly accessible, visually aligned with the reference, and does not imply unsupported persistence or payment behavior.

## Dependencies

Depends on Slices 01–04.

## Verification Checklist

- Known product slugs render through the public localized route.
- Unknown product slugs return the expected not-found response.
- Product props contain no account-only data or trusted client-side pricing authority.
- Color, size, gallery, wishlist, add-to-cart, size-chart, and recommendation interactions expose accessible names and selected/disabled states.
- If cart or wishlist mutations exist, guests, authenticated users, invalid variants, and successful actions are tested at the HTTP boundary.
- Product image alt text and decorative image treatment are correct.
- Responsive review covers desktop, tablet, and mobile layouts.
- Run the focused Pest feature test, `vendor/bin/pint --dirty --format agent` for changed PHP, `npm run build`, and `git diff --check`.

## Commit Status

Not requested — no commit will be made unless the user asks.
