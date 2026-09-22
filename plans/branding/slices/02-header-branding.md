# Header Branding

## Commit Status

Not requested

## Outcome

Rebrand the shared storefront header to match the supplied ARTIFACTS reference across desktop and mobile layouts.

## Dependencies

- Slice 01 brand tokens.
- The supplied screenshot in `plans/branding/resources/`; no logo source files are available.
- Existing header rule in `.ai/rules/header.md`.

## Intended Changes

- Create a clean, reusable ARTIFACTS wordmark and A/star mark from the supplied reference, then replace the temporary “Atelier Street” text and circular A treatment in `resources/js/Layouts/Header/Header.tsx`.
- Match the reference header’s restrained monochrome treatment, typography, sizing, spacing, icon weight, borders, and utility controls.
- Preserve the existing search behavior, locale-aware Wayfinder links, authenticated bag/profile behavior, and guest sign-in behavior.
- Define the mobile header/menu behavior only to the extent supported by the supplied reference or confirmed requirements.
- Keep the header accessible with semantic navigation, labels, focus states, and responsive keyboard behavior.

## Verification

- Compare the header against the supplied screenshot at its reference dimensions.
- Check authenticated and guest states, search open/closed states, both locales, keyboard navigation, and mobile widths.
- Run the focused header/home/auth tests, TypeScript checks, and production build.
