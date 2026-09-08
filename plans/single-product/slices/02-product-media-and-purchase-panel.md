# Slice 02 — Product Media and Purchase Panel

## Outcome

Build the top product-detail experience: breadcrumb, thumbnail gallery, primary product image, and purchase-panel content.

## Dependencies

Depends on Slice 01 for the product payload.

## Files / Areas to Change

- `resources/js/Pages/Product/Components/ProductBreadcrumb.tsx`.
- `resources/js/Pages/Product/Components/ProductGallery.tsx`.
- `resources/js/Pages/Product/Components/ProductPurchasePanel.tsx`.
- `resources/js/Pages/Product/Product.tsx`.

## Intended Behavior

- Show the localized breadcrumb from catalog/category context to the current product.
- Render a vertical thumbnail rail and large primary image on desktop; stack the gallery into a usable mobile layout.
- Selecting a thumbnail changes the primary image without losing the product context.
- Display the product eyebrow/category, name, price, description, and the purchase panel in the two-column desktop composition shown by the reference.
- Use Tailwind utilities and existing public-layout typography/color conventions.
- Provide descriptive alt text and keyboard-operable thumbnail buttons.

## Verification

- Verify every image has appropriate alt text and thumbnail buttons expose selected state.
- Verify keyboard focus and image switching behavior.
- Compare the desktop proportions and mobile stacking against the supplied reference.
