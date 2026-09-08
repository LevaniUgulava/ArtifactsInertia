# Slice 03 — Order Summary and Checkout

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Build the order-summary card and checkout handoff shown on the right side of the reference.

## Dependencies

Depends on Slice 02 for cart totals and on an explicit decision about checkout/promo behavior.

## Files / Areas

- resources/js/Pages/Cart/Components/OrderSummary.tsx.
- resources/js/Pages/Cart/Components/CartBenefits.tsx or equivalent small presentation component.
- Server-side total/promo contract if calculations are not fixture-backed.
- Wayfinder checkout/promo routes only if those routes exist or are approved.

## Intended Behavior

- Display subtotal, estimated shipping, tax, and total with consistent currency formatting.
- Provide a promo-code input and Apply action with a clear inactive/loading/error/success contract.
- Provide the primary Proceed to Checkout action without pretending to complete checkout when that flow does not exist.
- Include payment-brand and reassurance content as accessible, non-functional presentation until payment processing is implemented.
- Keep all monetary calculations server-authoritative once cart persistence exists.

## Verification

- Test summary values for the supplied cart contract.
- Test zero/empty-cart totals and unavailable promo states.
- Verify currency and decimal formatting.
- Verify the checkout CTA uses a generated route or is explicitly disabled with an understandable state.
