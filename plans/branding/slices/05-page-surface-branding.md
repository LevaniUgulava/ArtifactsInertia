# Page Surface Branding

## Commit Status

Not requested

## Outcome

Bring the remaining page surfaces into the approved ARTIFACTS visual language after the shared header, logic, and favicon are established.

## Dependencies

- Slices 01–04.
- Supplied page-specific screenshots or reference assets, if any.

## Intended Changes

- Align shared typography, headings, buttons, links, cards, filters, forms, badges, dividers, empty states, and image treatments across Home, Catalog, Product, Cart, Checkout, Profile, and Auth.
- Replace temporary “Atelier Street” brand treatments and placeholder brand assets only with approved ARTIFACTS resources.
- Keep existing routes, forms, product/cart behavior, and Inertia page contracts intact.

## Verification

- Compare each affected page with the supplied references at matching viewport sizes.
- Verify interactive, validation, loading, empty, authenticated, and guest states.
- Run the narrowest relevant feature tests after each page group, then run TypeScript checks and the production build.
