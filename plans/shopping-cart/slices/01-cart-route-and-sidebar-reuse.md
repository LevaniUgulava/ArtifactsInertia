# Slice 01 — Cart Route and Sidebar Reuse

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Expose the cart at a localized protected route and render it inside the existing profile layout without creating a new sidebar.

## Dependencies

None. This slice establishes the shell used by all later cart slices.

## Files / Areas

- routes/web/auth.php for the localized cart route.
- A focused controller or the existing profile controller, following current controller conventions.
- resources/js/Pages/Profile/Components/ProfileSidebar.tsx to accept an active navigation key.
- resources/js/Layouts/ProfileLayout.tsx and resources/js/Pages/Cart/Cart.tsx.
- Generated Wayfinder routes and focused feature tests.

## Intended Behavior

- Add GET /{lang}/cart with the cart route name and an authentication middleware consistent with the current web session flow.
- Render the cart page inside ProfileLayout so Header and ProfileSidebar are reused directly.
- Change only the existing sidebar active-state behavior; do not add a cart-specific sidebar component.
- Highlight Cart on the cart page and preserve Profile highlighting on the profile page.
- Keep the route localized and use the generated cart.url() helper from React.

## Verification

- Authenticated users receive the Cart/Cart Inertia component.
- Guests are redirected to the localized login page.
- The existing profile route still renders with Profile active.
- Generated Wayfinder routes contain the cart URL without duplicate exports.
