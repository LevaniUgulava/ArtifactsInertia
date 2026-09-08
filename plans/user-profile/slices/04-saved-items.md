# Slice 04 — Saved Items

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Render the saved-items product cards shown in the reference, including image, name, price, view action, and add-to-cart action where supported.

## Dependencies

Depends on Slice 01. Requires a decision on whether saved items are persisted or represented by the current static catalog data.

## Files / Areas

- Approved saved-item/product data contract and controller props.
- Profile saved-item components, reusing the existing product type conventions where appropriate.
- Cart/product routes and Wayfinder helpers if actions are implemented.
- Focused feature and frontend build verification.

## Intended Behavior

- Match the four-card layout from the reference while adapting to tablet/mobile widths.
- Use stable product identifiers for React keys; do not rely on display names if a persisted product model is introduced.
- Show an intentional empty state when no items are saved.
- Only enable “View”, “Browse More”, and “Add to Cart” when corresponding product/cart behavior exists.

## Verification

- Test that saved items are scoped to the authenticated user if persistence is introduced.
- Test populated and empty states.
- Verify image alt text, action labels, and responsive card layout.
- Run `npm run build` after implementation.
