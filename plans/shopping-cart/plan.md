# Shopping Cart Plan

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Implement a shopping-cart page matching the supplied reference: the existing Atelier Street account shell and sidebar, cart item rows with product details and quantity controls, save/remove actions, an order summary, promo-code input, checkout CTA, and a continue-shopping link.

Reference: [Screenshot 2026-09-08 at 14.57.48.png](resources/Screenshot%202026-09-08%20at%2014.57.48.png)

The blue lines in the reference are treated as annotations/guides, not UI elements.

## Key Architectural Decisions

- Reuse the existing ProfileLayout and ProfileSidebar; do not create a second cart sidebar or duplicate account navigation.
- Extend the existing ProfileSidebar with an activeItem prop so the Cart entry is highlighted on the cart page while Profile remains highlighted on the profile page.
- Add a localized /en/cart-style route named cart, protected by the existing session authentication boundary because this first screen is part of the authenticated account shell.
- Keep cart presentation in separate components: cart page, cart item row, quantity control, order summary, and cart reassurance/benefits.
- Use Wayfinder for cart, home, profile, checkout, and logout links/actions. Do not hardcode frontend route URLs.
- Establish a cart data/action contract first. The current repository has no cart, product, checkout, or promo persistence, so the first implementation must either use explicit fixture data or receive an approved session/domain contract before adding storage.

## Slices

1. [01-cart-route-and-sidebar-reuse.md](slices/01-cart-route-and-sidebar-reuse.md) — add the protected cart route and reuse the existing profile layout/sidebar with configurable active navigation.
2. [02-cart-items.md](slices/02-cart-items.md) — build separate cart item rows with product metadata, quantity controls, save-for-later, and remove actions.
3. [03-order-summary-and-checkout.md](slices/03-order-summary-and-checkout.md) — build subtotal, shipping, tax, promo-code, total, checkout CTA, and reassurance content.
4. [04-cart-interactions-and-empty-state.md](slices/04-cart-interactions-and-empty-state.md) — define cart state transitions, empty cart behavior, continue shopping, and action feedback.
5. [05-cart-verification.md](slices/05-cart-verification.md) — verify authorization, props, responsive layout, accessibility, route generation, tests, and build output.

## Verification Strategy

- Add Pest feature coverage for the authenticated cart route, guest redirect, and cart payload shape.
- Test item ownership/state boundaries when a persistence contract is introduced.
- Add frontend interaction coverage only if the project adopts a browser/component test tool; otherwise verify the behavior through the server contract and build.
- Run focused tests after each slice, vendor/bin/pint --dirty --format agent after PHP edits, and npm run build after frontend edits.
- Review the page at desktop, tablet, and mobile widths against the supplied reference.

## Risks / Prerequisites

- No cart or product domain currently exists. Decide whether the first version is a read-only fixture-backed screen or introduces session/database-backed cart behavior.
- The reference includes checkout and promo-code actions, but no checkout or promotion routes currently exist; these actions must remain clearly inactive or be implemented as part of an approved follow-up scope.
- The screenshot includes payment-brand marks and reassurance copy. Use accessible text/labels and avoid implying payment processing until the checkout flow exists.
- Guest cart behavior is not defined. This plan assumes the first cart page is authenticated to match the reused profile shell.
