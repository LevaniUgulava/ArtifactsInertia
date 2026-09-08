# Slice 02 — Checkout Shell and Shipping

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Build the checkout shell and shipping-information section shown in the reference.

## Dependencies

Depends on Slice 01. Requires a decision about whether saved addresses are fixture-backed or persisted.

## Files / Areas

- resources/js/Layouts/CheckoutLayout.tsx if a dedicated shell is needed.
- resources/js/Pages/Checkout/Components/CheckoutHeader.tsx or equivalent breadcrumb component.
- resources/js/Pages/Checkout/Components/ShippingInformation.tsx.
- Checkout page prop types and server-side shipping contract.
- Form request validation and feature tests.

## Intended Behavior

- Reuse the global Header and keep the checkout content independent from the profile sidebar.
- Render Cart → Checkout breadcrumb navigation using generated route helpers.
- Provide labeled first name, last name, street address, city, postal code, country, and phone fields matching the reference.
- Provide a Use saved address boundary only when saved-address data and authorization are available.
- Preserve entered values on validation errors and show field-level accessible errors.
- Do not expose another user's address or trust a client-provided owner ID.

## Verification

- Test required/invalid shipping fields through the request boundary.
- Test that saved-address data is scoped to the authenticated user if persistence is introduced.
- Verify labels, error associations, focus states, and mobile form layout.
