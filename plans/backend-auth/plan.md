# Backend Authentication Plan (Sanctum + Form Requests)

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Implement session-based authentication for the Inertia app using Sanctum's `auth:sanctum` guard. Covers registration, login (rate-limited), logout, and one protected route demonstrating the middleware. Uses Form Requests for validation/credentials and follows the project's Pest + Wayfinder conventions.

Frontend wiring (submit handlers, error display, logout buttons) is explicitly out of scope — existing static Auth pages are untouched.

## Key Architectural Decisions

- **Session-based auth**: this is a server-rendered Inertia web app, so auth flows run over `web` routes with sessions. Sanctum is installed so the `auth:sanctum` middleware/guard is available for protecting routes, per request.
- **Plain auth URLs**: auth pages and POST routes live at `/login`, `/register`, `/logout` (no `{lang}` prefix). The `home` route keeps its `/{lang}` shape. This fixes the current defect where `/login` resolves to the `/{lang}` wildcard and renders `Home/Home`.
- **Registration field mapping**: the existing Register page submits `username`; the `users` table has a `name` column. `RegisterRequest` validates `username` and the controller stores it into `name`. No frontend change.
- **Form Requests for validation**: `RegisterRequest` and `LoginRequest` in `app/Http/Requests/Auth/`. Login throttling uses a per-`email|ip` key via `RateLimiter`, surfaced as field errors (Breeze-style), instead of a shared limiter — best practice per `security.md`.
- **One `AuthController`**: `app/Http/Controllers/Auth/AuthController.php` holds `register()`, `login()`, and `logout()`; no separate per-action controllers.
- **Redirect target after auth is `/`** (which `Route::redirect('/', '/en')` resolves). No `lang` parameter is passed in the redirect, since locale is resolved on the frontend via shared Inertia props.
- **No email verification** in this scope; user created and logged in directly.
- **Protected route** `/account` (name `account`) guarded by `auth:sanctum`, temporarily rendering `Home/Home` until a real page is planned in a later slice.
- **Testing**: `RefreshDatabase` enabled for Feature tests in `tests/Pest.php`. Pre-existing broken page tests were corrected to match real behavior: `HomePageTest` hits `/en`, `ExampleTest` asserts the `/` → `/en` redirect.

## Slices

1. `01-sanctum-setup.md` — install `laravel/sanctum`, publish config + migration, run migration, confirm `auth:sanctum` guard works, share `auth.user` via `HandleInertiaRequests`.
2. `02-auth-route-shape.md` — move auth GET routes from the `{lang}` group to plain paths and register `web/auth.php` before the `/{lang}` home wildcard; get existing `AuthPagesTest` green.
3. `03-registration.md` — `RegisterRequest`, `AuthController::register`, `POST /register`, registration tests.
4. `04-login.md` — `LoginRequest` with throttled credentials, `AuthController::login`, `POST /login`, login tests.
5. `05-logout-and-protected-route.md` — `POST /logout` (+ session invalidation), `GET /account` with `auth:sanctum`, logout/guard tests.

## Verification Strategy

- New Pest feature tests per slice under `tests/Feature/Auth/` (created with `php artisan make:test --pest`).
- Run narrowest tests after each slice; full `php artisan test --compact` at the end.
- `vendor/bin/pint --dirty --format agent` after any PHP edits.
- Confirm routes/middleware with `php artisan route:list`.

## Risks / Prerequisites

- Sanctum install approved by user; latest major version will be resolved by Composer against Laravel 13.
- `auth:sanctum` relies on Sanctum's runtime-registered guard; verified via logout/account tests rather than config assumptions.
- `SetLocale` reads `lang` from the query string, not the path — the `{lang}` prefix is effectively cosmetic today. Locale handling is out of scope and belongs to the separate site layout concern.
- Redirection to `home` needs an explicit `lang` value; `app()->getLocale()` (default `en`) is used until locale state is established.
