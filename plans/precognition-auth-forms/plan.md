# Precognition for Login & Register Forms

## Commit Status

Not requested.

## Outcome

Live, real-time validation on the existing Login and Register forms powered by the backend Form Requests (`RegisterRequest`, `LoginRequest`) — no duplicated validation rules on the frontend. Field errors appear as the user blurs each field; valid fields get a green confirmation. Full submission still runs the normal auth flow.

## Key Decisions

- **No new dependencies.** Server-side Precognition ships in Laravel 13 core (`Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests`). Client-side support is built into Inertia v3 (`useForm(...).withPrecognition('post', url)` in `@inertiajs/react`).
- **Middleware registered as alias `'precognition'`** in `bootstrap/app.php`, applied as a **middleware group** to the two auth POST routes (`/login`, `/register`). Not applied to the whole `web` group.
- **Frontend uses Inertia's built-in `useForm`** with `withPrecognition('post', '/login' | '/register')` and plain URL strings (Wayfinder POST helpers are stale until next `npm run build`).
- **`AuthLayout` gains an optional `onSubmit` prop** so each page wires its own `form.submit()` while the shell keeps rendering the shared layout. Verification/UpdatePassword pages stay static (pass no `onSubmit`).
- **`AuthInput` gets full visual feedback:**
  - **Default (untouched):** slate-300 border, no icon.
  - **Valid:** green-500 border + green `CheckCircle2` icon (lucide-react).
  - **Error:** red-500 border + red `AlertCircle` icon (lucide-react) + red error text below.
  - **Focus:** amber-700 border override (existing behavior, preserved).
  - Icons appear only after validation has run (blurred at least once).
- **Custom messages**: LoginRequest's `authenticate()` side effects (rate limiting, credential check) run only on real submission — precognition requests only execute validation rules, so this is unchanged.

## Slices

1. `01-backend-precognition.md` — register middleware alias, add group to POST routes, add Precognition-aware tests proving validation happens without creating users or authenticating.
2. `02-frontend-forms.md` — wire `useForm` + `withPrecognition` into `Login.tsx` and `Register.tsx`; add `onSubmit` to `AuthLayout`; upgrade `AuthInput` with valid/error visual states + icons; verify with a build/type-check.

## Verification Strategy

- Backend: `php artisan test --compact tests/Feature/Auth/`
- Frontend: `npm run build` (Vite) — confirms TS/JSX compiles clean.
- Final: full `php artisan test --compact` + `vendor/bin/pint --dirty --format agent`.
- Browser check requires `npm run dev` (user runs it to see live validation).

## Risks / Notes

- Precognition validation hits the `unique` rule on email (a DB query) per blur — expected and cheap here.
- The login rate-limit error and failed-credentials error surface under the email field via `ValidationException`, same as today.
- Stale Wayfinder route types (no `.post()` yet) are the reason for string URLs; after the next `npm run build` we could switch to Wayfinder helpers if desired.