# Slice 04 — Editorial Banner and Catalog Navigation

## Outcome

Complete the lower-page editorial content, sorting, pagination, and URL-driven catalog interactions.

## Dependencies

Depends on Slices 01–03 for the route contract and catalog components.

## Files / Areas to Change

- `resources/js/Pages/Catalog/Components/EditorialBanner.tsx`.
- `resources/js/Pages/Catalog/Components/CatalogPagination.tsx`.
- Catalog page sorting/filter/page navigation logic.
- Wayfinder-generated route usage for catalog navigation.

## Intended Behavior

- Add the “The Art of Layering” editorial banner with supporting copy, story CTA treatment, and image.
- Add a compact sort selector and pagination controls matching the reference, including current-page styling and previous/next affordances.
- Preserve active filters and sort state while changing pages; preserve page state when appropriate while changing filters.
- Use Inertia/Wayfinder navigation and query parameters instead of hardcoded URLs or full-page form submissions.
- Provide an empty-result state and a clear path back to the unfiltered catalog if filters produce no products.

## Verification

- Verify sort, filter, clear, and pagination transitions produce predictable URL state.
- Verify invalid or missing query values fall back safely to the default collection state.
- Verify keyboard operation and accessible names for pagination and sort controls.
- Check the editorial section and pagination at mobile widths.
