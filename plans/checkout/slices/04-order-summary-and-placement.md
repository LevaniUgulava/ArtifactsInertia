# Slice 04 — Order Summary and Placement

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Connect the cart summary to checkout and define the safe order-placement and post-submit experience.

## Dependencies

Depends on Slices 01–03 and an approved server-authoritative cart/order/payment contract.

## Intended Behavior

- Show cart items, subtotal, delivery cost, tax, promo code, and total in a separate summary component.
- Recalculate all monetary values on the server; client totals are display hints only.
- Allow promo-code application only through an approved validated endpoint or keep it clearly unavailable.
- Disable duplicate submissions while an order is being placed.
- On success, redirect through a generated route to an order confirmation page or approved next step.
- On failure, preserve safe form data, show an actionable message, and do not expose provider secrets or raw payment data.
- Include terms-and-conditions acknowledgement before order placement if required by the approved contract.

## Verification

- Test valid placement and persisted order ownership when the order domain exists.
- Test stale/changed cart totals are not accepted from the client.
- Test duplicate-submit protection and payment/order failure handling.
- Verify the success redirect and confirmation data do not expose sensitive values.
