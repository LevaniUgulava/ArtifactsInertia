# Slice 01 — Catalog Route and Data Contract

## Outcome

Expose a public localized catalog page and provide a stable Inertia payload for the collection, filters, products, sorting, and pagination shown in the reference.

## Dependencies

None. This is the foundation slice for all later catalog UI slices.

## Files / Areas to Change

- `routes/web.php` and the localized route structure.
- A catalog controller under `app/Http/Controllers/` following the existing controller conventions.
- `resources/js/Pages/Catalog/Catalog.tsx` as the page entry point.
- Generated Wayfinder route output after the route is added.
- A focused feature test for the public catalog route.

## Intended Behavior

- Add a public `/{lang}/catalog` route named `catalog`.
- Render the page through the existing public root layout and shared Header.
- Return a deterministic fixture-backed payload containing collection title/count, featured collection data, editorial data, filter options, sort options, current query state, products, and pagination metadata.
- Keep the payload typed in the React page/components and avoid introducing migrations or product persistence without approval.
- Preserve query parameters for filter, sort, and page state in the contract even if fixture filtering is initially minimal.

## Verification

- Feature test: guest can request the localized catalog route and receives a successful Inertia response with the expected component and core props.
- Verify the route is public and does not require `auth`, `verified`, or `auth:sanctum`.
- Regenerate Wayfinder and run the focused test.
