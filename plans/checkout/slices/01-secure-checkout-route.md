# Slice 01 — Secure Checkout Route

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Create the checkout page and order-placement route with a strict authenticated-and-verified access boundary.

## Dependencies

None for route protection. Order placement depends on the approved cart/order contract.

## Files / Areas

- routes/web/auth.php for the localized checkout route.
- A focused CheckoutController and a place-order request/controller boundary.
- resources/js/Pages/Checkout/Checkout.tsx.
- Generated Wayfinder routes.
- tests/Feature/CheckoutPageTest.php and place-order endpoint tests.

## Intended Behavior

- Add GET /{lang}/checkout named checkout with auth and verified middleware.
- Add a state-changing place-order route with the same auth and verified middleware.
- Guests are redirected to /en/login.
- Unverified users are redirected to /en/verification and receive no checkout/payment props.
- Verified users receive the checkout page and only the fields/data approved by the checkout contract.
- Use server-side authorization based on the current session user; never trust a user identifier from the client.

## Verification

- Test guest access.
- Test unverified authenticated access.
- Test verified authenticated access and Inertia component.
- Test the place-order endpoint rejects guest and unverified requests.
- Confirm generated route helpers have no duplicate exports and use the localized URL.
