# Slice 02 — Cart Items

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Build the cart item list as reusable components matching the reference rows.

## Dependencies

Depends on Slice 01. Requires an approved cart-item data contract or explicit fixture data for the first pass.

## Files / Areas

- resources/js/Pages/Cart/Components/CartItemRow.tsx.
- resources/js/Pages/Cart/Components/QuantityControl.tsx.
- Cart page prop types and item fixtures/serialization boundary.
- Cart action routes only if persistence behavior is approved.

## Intended Behavior

- Show product image, name, price, size, color, quantity, save-for-later, and remove controls as represented in the reference.
- Use stable product/cart-line identifiers for React keys.
- Keep quantity controls keyboard accessible and expose meaningful labels such as “Decrease quantity” and “Increase quantity”.
- Keep item actions visually distinct and avoid enabling writes without an actual state boundary.
- Handle long product names and narrow screens without horizontal overflow.

## Verification

- Test that all expected item fields are supplied to the page.
- Test populated and empty item collections.
- Verify responsive row-to-stack behavior and accessible control labels.
- If actions are persisted, test quantity limits, removal, and user/cart ownership.
