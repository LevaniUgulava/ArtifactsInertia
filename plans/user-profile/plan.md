# User Profile Dashboard Plan

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Replace the current protected `/account` placeholder with an authenticated user-profile dashboard matching the supplied reference: Atelier Street branding, account navigation, profile summary, order history, saved items, and account settings.

Reference: [Screenshot 2026-09-08 at 14.41.22.png](resources/Screenshot%202026-09-08%20at%2014.41.22.png)

The blue lines in the reference are treated as annotations/guides, not UI elements.

## Key Architectural Decisions

- Keep `/account` as the authenticated profile entry point and render a dedicated Inertia `Profile` page instead of reusing `Home/Home`.
- Create a profile-specific authenticated shell with the existing Atelier Street visual language; do not force the public storefront `RootLayout` to own the account sidebar.
- Share the authenticated user through the existing Inertia shared `auth.user` prop and pass profile dashboard data from the Laravel controller as explicit props.
- Use Wayfinder for all frontend links and form/action requests.
- Reuse existing product image/name/price conventions where they are compatible with saved-item cards. Do not introduce a new product domain or persistence model without confirming the required catalog scope.
- Treat orders, saved items, addresses, payment methods, and preferences as data contracts that need an implementation decision because the current application has no corresponding models or tables.

## Slices

1. [01-profile-route-and-shell.md](slices/01-profile-route-and-shell.md) — create the protected profile page, controller response, and responsive dashboard shell.
2. [02-profile-summary-and-navigation.md](slices/02-profile-summary-and-navigation.md) — implement the profile identity block, metrics, sidebar navigation, and authenticated account actions.
3. [03-order-history.md](slices/03-order-history.md) — define and render the order-history contract, rows, status badges, totals, and detail links.
4. [04-saved-items.md](slices/04-saved-items.md) — define and render the saved-product cards and their view/cart actions.
5. [05-account-settings.md](slices/05-account-settings.md) — define and render address, payment, and preference cards with safe action boundaries.
6. [06-verification-and-responsive-qa.md](slices/06-verification-and-responsive-qa.md) — verify authorization, empty/error states, responsive behavior, accessibility, and production build output.

## Verification Strategy

- Add focused Pest feature coverage for the authenticated profile route, guest redirect, and controller-provided dashboard props.
- Add coverage for each data-backed section once its persistence contract is approved, including empty states and user ownership boundaries.
- Run the narrowest feature tests after each backend slice, `vendor/bin/pint --dirty --format agent` after PHP edits, and `npm run build` after frontend work.
- Review the page visually against the supplied reference at desktop, tablet, and mobile widths.

## Risks / Prerequisites

- The current codebase has no order, saved-item, address, payment-method, or preference models/tables. Before implementation, decide whether this first version uses fixture/derived data or introduces those domains and their migrations.
- The screenshot shows populated data but does not specify loading, empty, error, pagination, order-detail, or edit-form behavior; those states must be confirmed or kept minimal in the first implementation.
- Product actions such as “Add to Cart”, address editing, payment management, and preference editing need existing routes or an explicit follow-up scope.
- The current profile route is named `account`; preserve that public contract unless route naming is intentionally changed.
