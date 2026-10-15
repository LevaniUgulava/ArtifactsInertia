# Slice 02 — Footer Layout and Links

## Outcome

Implement the screenshot-matched footer structure in the existing shared footer component while preserving localized navigation behavior.

## Dependencies

Depends on Slice 01 and the supplied reference resource.

## Files / Areas

- `resources/js/Layouts/Footer/Footer.tsx`
- `resources/js/Layouts/RootLayout.tsx` only if the approved reference requires a layout integration adjustment.
- Existing Wayfinder route imports used by footer links.
- Existing brand utility classes and shared icons.

## Intended Behavior

- Footer background spans the full viewport width, flush with the page edges, without an inset rounded-card treatment.
- Inner content aligns with the site's existing maximum-width container.
- The left block contains the brand lockup, short copy, and social icon links where destinations exist.
- The right block contains a single `Quick Link` navigation group.
- The bottom row contains copyright and privacy/terms/cookie links separated by a divider.
- Links remain localized and route through existing named Wayfinder helpers where routes exist.
- Icon-only links receive accessible labels and visible focus states.
- No backend endpoints or data models are added.

## Verification

- Check navigation URLs for the active locale.
- Check mobile stacking and desktop alignment.
- Run the Vite production build and `git diff --check`.

## Commit Status

Not requested — planning only.
