# Auth Screens Plan

## Commit Status

Frontend implementation and page-route wiring complete — no commit requested.

## Outcome

Plan a consistent frontend visual system for login, registration, email verification, and password recovery/update screens. Each screen will share the same auth shell and visual language while keeping its own approved fields, input names, actions, and messages.

## Scope

- Frontend screen styling, component structure, and read-only page routes only; authentication processing remains out of scope.
- One shared auth layout for spacing, typography, branding, background, card treatment, links, buttons, and responsive behavior.
- One reusable auth input component driven by screen-specific field configuration, so styling and accessibility remain consistent while names and input types differ.
- One self-contained slice per screen so field differences remain explicit and reviewable.

## Pending User Input

- Whether the password-update form is the forgot-password screen or a separate screen after a forgot-password request.
- Authentication processing, validation, persistence, and backend route behavior remain out of scope.

## Implemented Frontend

- Shared `AuthLayout` with the supplied split-panel visual style.
- Reusable `AuthInput` component for all screen-specific fields.
- Static TypeScript pages for login, registration, verification, and password update.
- Forms prevent submission locally; no authentication, validation, or persistence is configured.
- Named GET routes are available at `/login`, `/register`, `/verification`, and `/password/update`; their TypeScript URLs are generated through Wayfinder.
- The storefront `RootLayout` is applied only to the home page so auth pages render with their dedicated shell.

## Reference Notes

- `Screenshot 2026-09-07 at 20.59.31.png` is the visual reference for every auth screen.
- The desktop composition is a two-panel split: a large editorial image/brand panel on the left and a white form panel on the right.
- The form panel includes a heading and supporting copy, fields, a warm tan primary button, secondary links/social actions where applicable, supporting copy, and low-contrast footer links.

## Slices

1. [01-shared-auth-style.md](slices/01-shared-auth-style.md) — define the reusable auth shell, input component, and responsive visual rules.
2. [02-login.md](slices/02-login.md) — define the login screen’s unique fields and actions within the shared shell.
3. [03-register.md](slices/03-register.md) — define the registration screen’s unique fields and actions within the shared shell.
4. [04-verification.md](slices/04-verification.md) — define the verification screen’s unique fields and actions within the shared shell.
5. [05-forgot-password.md](slices/05-forgot-password.md) — define the password-recovery/update screen’s unique fields and actions within the shared shell.

## Verification Strategy

- Review each screen against the supplied references at desktop, laptop, and mobile widths.
- Type-check and build the frontend after implementation.
- Add focused frontend/page tests for rendering and each screen’s distinct field/action contract once the field matrix is approved.

## Risks and Prerequisites

- The supplied reference currently shows the login visual style; registration, verification, and password-update screens should reuse it.
- Backend authentication behavior, validation, authentication state, and email delivery are intentionally out of scope for this plan.
- Final content and assets must be approved before replacing placeholders.
