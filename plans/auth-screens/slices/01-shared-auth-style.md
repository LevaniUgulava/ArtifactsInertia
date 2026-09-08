# Shared Auth Style Slice

## Commit Status

Frontend implementation and page-route wiring complete — no commit requested.

## Outcome

Define one reusable auth shell that gives login, registration, verification, and password-recovery/update screens the same visual identity and responsive behavior.

## Dependencies

- Login reference screenshot in `../resources/Screenshot 2026-09-07 at 20.59.31.png`.
- Confirmed responsive targets and accessibility expectations.

## Decisions Pending User Input

- Use a two-panel auth shell: full-height image/brand panel on the left and a white form panel on the right on large screens.
- Preserve the reference’s roughly balanced desktop split, generous white space, light gray panel border, and restrained warm-neutral palette.
- Place Atelier Street branding and supporting copy near the bottom of the image panel.
- Use a centered, constrained form column with understated borders, muted labels, warm tan primary actions, social buttons, secondary links, and a small footer navigation.
- Collapse the image panel and form panel into a mobile-friendly single-column flow at small widths.

## Intended Changes

- Identify the shared React component boundary for the auth shell.
- Define shared field, label, error, button, link, and status-message styles.
- Create one reusable `AuthInput` component (or equivalent project-approved name) that accepts field configuration such as `name`, `type`, `label`, `placeholder`, `value`, `required`, and error/help text.
- Ensure the reusable input generates stable label/input associations, supports password and email types, exposes autocomplete metadata where approved, and renders validation styling consistently.
- Keep screen-specific input definitions in each page/slice rather than duplicating input markup.
- Keep the shell presentation-only until backend behavior is separately approved.

## Implemented Files

- `resources/js/Layouts/AuthLayout.tsx`
- `resources/js/Components/Auth/AuthInput.tsx`
- `resources/js/routes/index.ts` and `resources/js/routes/password/index.ts` (generated page URLs)

## Verification

- Confirm all four screens can use the same shell without forcing identical fields or copy.
- Check keyboard focus, readable contrast, and responsive layout at the approved viewport sizes.
- Confirm each screen can render its distinct field set through the reusable input component.
