# Checkout Plan

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Implement the checkout page shown in the supplied reference: authenticated customer checkout with shipping information, delivery method selection, payment details, an order summary, promo code, order placement, and reassurance content.

Reference: [Screenshot 2026-09-08 at 15.18.06.png](resources/Screenshot%202026-09-08%20at%2015.18.06.png)

The blue lines in the reference are treated as annotations/guides, not UI elements.

## Access and Security Requirements

- Checkout page access must require both authentication and a verified email address.
- Apply the session web middleware and Laravel's email-verification middleware together: auth plus verified.
- A guest must be redirected to the localized login page.
- An authenticated but unverified user must be redirected to the localized verification page and must not receive checkout data or payment fields.
- The place-order endpoint must use the same auth plus verified boundary and re-check the current user server-side.
- Never store or log raw card numbers, CVV/CVC values, or other payment credentials. Use a future approved gateway/tokenization boundary for real payment processing.

## Key Architectural Decisions

- Use a dedicated checkout page and layout matching the reference; the screenshot does not show the account sidebar, so do not duplicate or force the profile sidebar into checkout.
- Reuse the existing global Header for branding and authenticated customer identity.
- Keep the page split into separate React components: breadcrumb/header, shipping form, delivery methods, payment method selector, order summary, and checkout reassurance.
- Use Wayfinder for the checkout page, cart return, verification redirect target, and place-order action.
- Treat current cart data as the source for the order summary. The repository currently has fixture-backed cart data and no order, address, payment, or promotion persistence.
- Keep the first implementation contract explicit about whether address/payment values are fixture-backed, session-backed, or connected to an approved payment provider.

## Slices

1. [01-secure-checkout-route.md](slices/01-secure-checkout-route.md) — add the checkout page and place-order route with authenticated-and-verified access control.
2. [02-checkout-shell-and-shipping.md](slices/02-checkout-shell-and-shipping.md) — build the responsive checkout shell, shipping form, and saved-address boundary.
3. [03-delivery-and-payment.md](slices/03-delivery-and-payment.md) — build delivery selection and secure payment-method UI without exposing raw payment data.
4. [04-order-summary-and-placement.md](slices/04-order-summary-and-placement.md) — connect cart totals to the summary, promo handling, place-order state, and post-order handoff.
5. [05-checkout-verification.md](slices/05-checkout-verification.md) — verify authorization, verification status, validation, security, accessibility, responsive layout, tests, and build output.

## Verification Strategy

- Add feature tests for guest, unverified authenticated, and verified authenticated access.
- Add endpoint tests proving unverified users cannot submit an order and verified users receive the approved response contract.
- Test validation for shipping and delivery fields at the request boundary.
- Test that payment credentials are not persisted or returned in Inertia props/loggable response data.
- Run focused tests after each slice, vendor/bin/pint --dirty --format agent after PHP edits, and npm run build after frontend edits.
- Review the page at desktop, tablet, and mobile widths against the supplied reference.

## Risks / Prerequisites

- There is no order, address, payment, promotion, or checkout persistence in the current repository. The implementation needs an explicit decision between fixture/session behavior and adding those domains.
- A real place-order flow requires a payment provider and tokenization strategy; the UI alone must not imply that a payment was processed.
- The current cart is client-side fixture-backed, so a real checkout must first establish a server-authoritative cart and total calculation.
- The reference includes a login prompt, but a verified-only route means the authenticated implementation should show account context or omit redundant login messaging.
