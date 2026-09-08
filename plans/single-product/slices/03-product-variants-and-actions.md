# Slice 03 — Product Variants and Actions

## Outcome

Implement the product choices and action area: colors, sizes, size chart affordance, add-to-cart state, wishlist boundary, and reassurance benefits.

## Dependencies

Depends on Slices 01–02. Any persistent mutation depends on an approved cart/wishlist contract.

## Files / Areas to Change

- `resources/js/Pages/Product/Components/ProductVariantSelector.tsx`.
- `resources/js/Pages/Product/Components/ProductActions.tsx`.
- `resources/js/Pages/Product/Components/ProductBenefits.tsx`.
- A server endpoint/request only if the user approves cart or wishlist persistence during execution.
- Corresponding feature tests for any mutation endpoint added.

## Intended Behavior

- Render color swatches with text labels/accessible names and a visible selected state.
- Render size options with selected, unavailable, and focus states; include the Size Chart affordance from the reference.
- Prevent the add-to-cart action until required variants are selected.
- Use Wayfinder for the cart destination and any approved mutation route.
- If no mutation contract exists, keep the action explicitly fixture-backed or provide a sign-in/availability handoff without claiming persistence.
- Show complimentary shipping, free returns, and authenticity-guaranteed benefits with accessible text and icons.

## Verification

- Verify variant selections are keyboard accessible and mutually reflected in state.
- Verify the add-to-cart action cannot submit incomplete selections.
- Test server-side validation and cart state if a mutation endpoint is introduced.
- Verify guest wishlist behavior matches the approved authentication boundary.
