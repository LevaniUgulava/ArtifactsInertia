# Slice 02 — Catalog Filters

## Outcome

Build the catalog filter column as a separate responsive component matching the reference controls.

## Dependencies

Depends on Slice 01 for the catalog payload and query-state contract.

## Files / Areas to Change

- `resources/js/Pages/Catalog/Components/CatalogFilters.tsx`.
- Catalog page state or a small colocated filter-state helper if needed.
- The catalog page composition from Slice 01.

## Intended Behavior

- Render category checkboxes, size choices, color swatches, price range controls, collection checkboxes, Apply Filters, and Clear All actions.
- Keep the filter component presentational and typed; the page owns the selected state and navigation behavior.
- Use accessible labels, field grouping, focus states, and non-color-only indicators for selected colors.
- On desktop, keep the filter panel in the left column. On smaller screens, make it collapse into a usable stacked or disclosure-based section without losing access to controls.
- Do not duplicate the existing ProfileSidebar; this is catalog-specific filtering.

## Verification

- Verify all controls have labels and keyboard-accessible focus states.
- Verify selected values can be represented in the catalog URL/query contract.
- Check the filter layout at desktop, tablet, and mobile widths.
