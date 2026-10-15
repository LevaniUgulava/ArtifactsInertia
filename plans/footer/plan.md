# Footer Plan

## Commit Status

Not requested — planning only.

## Outcome

Refine the shared storefront footer into the supplied compact reference style while preserving existing route behavior, localization, and the current brand system.

## Current Surface

The footer is rendered globally by [`resources/js/Layouts/RootLayout.tsx`](../../resources/js/Layouts/RootLayout.tsx) through [`resources/js/Layouts/Footer/Footer.tsx`](../../resources/js/Layouts/Footer/Footer.tsx). It currently contains:

- Brand mark and introductory copy.
- Shop and account navigation links.
- Support description and mail contact.
- Localized copyright and footer note.
- English and Georgian footer translation namespaces.

## Reference Resources

Reference: [`Screenshot 2026-10-13 at 17.38.22.png`](resources/Screenshot%202026-10-13%20at%2017.38.22.png).

The target is a full-width white footer integrated into the page edge, without an inset rounded-card or modal appearance. Keep the brand lockup, concise description, and social icons on the left; one `Quick Link` column on the right; and a divider with copyright and legal links along the bottom. Constrain only the inner content to the site container.

## Slices

1. [`01-reference-and-footer-contract.md`](slices/01-reference-and-footer-contract.md) — Lock the reference-driven footer hierarchy, content, and responsive rules.
2. [`02-footer-layout-and-links.md`](slices/02-footer-layout-and-links.md) — Implement the rounded surface, brand/social block, quick links, and legal row.
3. [`03-footer-localization-and-qa.md`](slices/03-footer-localization-and-qa.md) — Complete concise English/Georgian copy and verify the responsive result.

## Verification Strategy

- Review the rendered footer at mobile, tablet, and desktop widths against the supplied reference.
- Verify every footer link uses the existing localized Wayfinder route helpers.
- Verify English and Georgian translations render without missing keys or overflow.
- Run the frontend production build and `git diff --check`.
- Add or update focused frontend tests only if the final behavior introduces testable interactions beyond navigation.

## Risks / Prerequisites

- The supplied screenshot is the visual source of truth; existing assets and routes should be reused where available.
- No new dependency, backend route, database change, or footer-specific controller is planned.
- Existing brand tokens, typography, and localization conventions will be reused.
- Implementation starts after this slice refresh and uses the supplied screenshot as the visual source of truth.
