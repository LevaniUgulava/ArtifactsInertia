# Branding Plan

## Commit Status

Not requested

## Outcome

Apply one consistent visual brand system across the storefront, authentication screens, checkout, profile, catalog, product, cart, header, and footer using the reference materials supplied in `resources/`.

## Reference Resources

Place supplied screenshots, logos, font files, color references, icons, and copy guidance in [`resources/`](resources/). The primary screenshot is required before implementation begins; it will be used to define the visual direction and acceptance criteria.

## Architectural Decisions

- Keep the existing Inertia React and Tailwind CSS v4 stack.
- Define reusable brand tokens in `resources/css/app.css` using the existing CSS-first Tailwind theme.
- Centralize repeated brand treatments in shared layouts and components rather than duplicating classes across pages.
- Preserve existing routes, locale behavior, authentication behavior, and Wayfinder usage.
- Treat the supplied screenshot as the visual source of truth for color, type scale, spacing, borders, radius, imagery, and component states.

## Ordered Slices

1. [01-brand-reference-and-tokens.md](slices/01-brand-reference-and-tokens.md) — Translate the supplied brand board into reusable visual tokens.
2. [02-header-branding.md](slices/02-header-branding.md) — Rebrand the desktop and mobile header to match the ARTIFACTS reference.
3. [03-brand-logic.md](slices/03-brand-logic.md) — Centralize brand identity data and its propagation through titles, shared props, translations, and layouts.
4. [04-favicon-and-metadata.md](slices/04-favicon-and-metadata.md) — Add the approved A/star favicon set and document metadata requirements.
5. [05-page-surface-branding.md](slices/05-page-surface-branding.md) — Align all remaining page surfaces with the shared brand system.
6. [06-assets-localization-and-qa.md](slices/06-assets-localization-and-qa.md) — Integrate final resources and verify responsive, accessible, localized output.

## Overall Verification

- Compare the implemented UI with every supplied screenshot at its reference viewport and at mobile, tablet, and desktop widths.
- Run focused Pest feature tests for affected pages.
- Run TypeScript checks and the Vite production build.
- Verify keyboard focus, readable contrast, semantic headings, image alternative text, and mobile navigation behavior.
- Confirm English and Georgian layouts do not overflow or lose brand elements.

## Risks and Prerequisites

- The supplied screenshot establishes the initial direction: ARTIFACTS wordmark, A/star mark, charcoal `#0B0B0B`, olive `#3A3A33`, taupe `#A69586`, stone `#F3F1EC`, and the tagline “WEAR A BETTER STORY”.
- Logo source files and favicon artwork are not supplied; implementation is approved to create clean SVG/code-native versions from the supplied reference. Font files remain a separate prerequisite if the exact display typeface is required.
- “Brand logic” is limited to centralizing brand identity and propagating it consistently; it does not add new business rules or brand administration features.
- If the screenshot depicts behavior not currently present, interaction requirements must be confirmed before implementation.
- Any brand font or image files should be supplied with licensing permission or an approved source.
- No dependency changes or backend changes are planned unless the supplied references require them.
