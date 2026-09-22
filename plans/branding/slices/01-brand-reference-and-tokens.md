# Brand Reference and Tokens

## Commit Status

Not requested

## Outcome

Convert the supplied screenshots and brand resources into a documented visual system that can be applied consistently throughout the app.

## Dependencies

- Supplied files in `plans/branding/resources/`.
- Existing conventions in `resources/css/app.css` and the current shared components.

## Intended Changes

- Inspect the screenshot for brand colors, typography, hierarchy, spacing rhythm, border and radius treatment, imagery style, icon weight, button states, and responsive differences.
- Define the approved color, font, spacing, radius, shadow, and typography tokens in `resources/css/app.css` using Tailwind v4 CSS-first configuration.
- Record any unresolved visual decisions in the implementation handoff rather than inventing values.
- Identify repeated patterns that should become or remain shared React components.

## Verification

- Confirm every token maps to a visible requirement in the supplied reference.
- Confirm tokens work in both supported locales and across the existing light visual treatment.
- Run the production build after token changes.
