# Slice 02 — Profile Summary and Navigation

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Implement the profile identity area and account navigation visible in the reference.

## Dependencies

Depends on Slice 01. Uses the authenticated user already shared by `HandleInertiaRequests`.

## Files / Areas

- Profile page/components created in Slice 01.
- `HandleInertiaRequests` only if the current shared user shape is insufficient.
- Auth/account route helpers and logout action.
- Focused profile feature tests.

## Intended Behavior

- Display the authenticated user’s name and email from server data.
- Provide the profile avatar treatment with an intentional fallback when no avatar exists; do not add media persistence unless separately approved.
- Render the reference metrics area as an explicit data contract. If orders/saved/reviews are not yet backed by data, keep the values out of the implementation or mark them as fixture-dependent rather than fabricating persistence.
- Provide navigation entries for Home, Catalog, Products, Cart, Checkout, Profile, and Login/Logout according to routes that actually exist.
- Use Wayfinder functions for links and logout, and preserve authorization boundaries.

## Verification

- Assert the authenticated user’s name/email are present in the Inertia props or rendered page contract.
- Assert a guest cannot access the profile data.
- Assert logout remains available and returns the user to the existing public entry point.
- Verify keyboard focus order and mobile navigation behavior.
