# Slice 03 — Collection and Product Grid

## Outcome

Build the main catalog content area with the collection heading, featured banner, and reusable product card/grid components.

## Dependencies

Depends on Slice 01 for product and collection data. Uses the filter layout from Slice 02 when composing the full page.

## Files / Areas to Change

- `resources/js/Pages/Catalog/Components/CollectionHeader.tsx`.
- `resources/js/Pages/Catalog/Components/FeaturedCollection.tsx`.
- `resources/js/Pages/Catalog/Components/CatalogProductCard.tsx`.
- `resources/js/Pages/Catalog/Components/CatalogProductGrid.tsx`.
- `resources/js/Pages/Catalog/Catalog.tsx`.

## Intended Behavior

- Show “Fall/Winter Collection”, the product count, sort control placement, and the featured “The Artisan Edit” banner.
- Render products in a three-column desktop grid with consistent image ratios, metadata, category/gender details, color indicators, and prices.
- Use descriptive alt text and resilient image sizing/loading behavior.
- Keep product cards separate from the existing home-page ProductGrid so catalog-specific badges, colors, and metadata do not leak into home sections.
- Use Tailwind utilities and existing typography/color conventions; do not add a new styling dependency.

## Verification

- Verify all fixture products render with stable keys and complete metadata.
- Check image alt text, card focus/hover behavior, and readable price/category contrast.
- Compare grid spacing, banner proportions, and typography against the supplied reference.
