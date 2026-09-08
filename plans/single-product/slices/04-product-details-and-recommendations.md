# Slice 04 — Product Details and Recommendations

## Outcome

Complete the lower product page with product details, material and care, fit and sizing information, and related recommendations.

## Dependencies

Depends on Slice 01 for detail/recommendation data and Slice 02 for the page composition.

## Files / Areas to Change

- `resources/js/Pages/Product/Components/ProductDetails.tsx`.
- `resources/js/Pages/Product/Components/CompleteTheLook.tsx`.
- Reusable catalog product-card types/presentation where appropriate.
- `resources/js/Pages/Product/Product.tsx`.

## Intended Behavior

- Render the three information columns shown in the reference: Product Details, Material & Care, and Fit & Sizing.
- Preserve readable line lengths and responsive stacking for small screens.
- Render four recommendation cards with image, name, and price using the established catalog card conventions.
- Keep recommendation links ready for Wayfinder product routes once multiple product slugs exist; do not hardcode application URLs.
- Handle missing optional details or recommendations without breaking the product page.

## Verification

- Verify details remain readable at desktop, tablet, and mobile widths.
- Verify recommendation cards have stable keys, alt text, and correct product display data.
- Verify recommendation navigation targets the approved product route contract.
