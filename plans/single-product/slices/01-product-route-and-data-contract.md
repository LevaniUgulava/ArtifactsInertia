# Slice 01 — Product Route and Data Contract

## Outcome

Expose a public localized product-detail route and provide a stable Inertia payload for the reference product and its related content.

## Dependencies

None. This is the foundation slice for all later product-detail UI slices.

## Files / Areas to Change

- `routes/web.php` or the existing localized public route structure.
- A focused controller under `app/Http/Controllers/`.
- `resources/js/Pages/Product/Product.tsx` as the Inertia page entry point.
- Generated Wayfinder route output.
- A focused feature test for product display and missing slugs.

## Intended Behavior

- Add a public `/{lang}/products/{product}` route named `product.show` or an equivalent stable dotted name.
- Resolve the fixture product by slug, with a not-found response for an unknown slug.
- Return product name, category, collection, price, description, images, color variants, size variants, availability metadata, benefits, details, and “Complete the Look” recommendations.
- Keep the payload free of internal inventory or account-only fields and shape it for later replacement by a product model/query.
- Keep the first version fixture-backed; do not add product migrations or persistence without approval.

## Verification

- Feature test: guest can view the known localized product route and receives the expected Inertia component and product props.
- Feature test: an unknown product slug returns not found.
- Confirm the route is public and does not require account verification.
- Regenerate Wayfinder and verify the named route is available to React.
