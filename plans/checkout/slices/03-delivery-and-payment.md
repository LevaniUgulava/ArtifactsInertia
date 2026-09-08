# Slice 03 — Delivery and Payment

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Build delivery-method selection and payment-method presentation matching the reference while preserving payment security.

## Dependencies

Depends on Slice 02. Real payment submission depends on an approved provider/tokenization integration.

## Files / Areas

- resources/js/Pages/Checkout/Components/DeliveryMethods.tsx.
- resources/js/Pages/Checkout/Components/PaymentDetails.tsx.
- Checkout form state and validation contract.
- Payment provider integration boundary, only if approved.

## Intended Behavior

- Render Express, Standard, and Next Day delivery choices with price and delivery estimate.
- Keep the selected delivery method in explicit form state and include only an allow-listed method in the server request.
- Render payment method tabs/options such as Card, Apple Pay, Google Pay, and PayPal as supported/unsupported states based on actual integration.
- For card payments, use hosted/tokenized fields or a provider token; never send raw card details to the Laravel application unless an approved compliant integration requires it.
- Mask any displayed payment identifier and never render CVV values.

## Verification

- Test that unsupported delivery/payment values are rejected.
- Test delivery selection changes the server-authoritative total.
- Test sensitive payment values are absent from serialized props, logs, and persisted application data.
- Verify keyboard navigation, selected-state announcements, and responsive payment controls.
