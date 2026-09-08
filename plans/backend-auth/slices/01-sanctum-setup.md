# 01 — Sanctum Setup

## Commit Status

Not requested.

## Outcome

Sanctum is installed, its config and `personal_access_tokens` migration are published and run, the `auth:sanctum` guard is usable, and authenticated user state is shared with the frontend.

## Dependencies

None (first slice).

## Files / Commands

- `composer require laravel/sanctum --no-interaction` — add dependency.
- `php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider" --no-interaction` — publishes `config/sanctum.php` and the migrations.
- `php artisan migrate` — creates `personal_access_tokens` plus Sanctum's cache/session-related tables if not already present.
- `app/Http/Middleware/HandleInertiaRequests.php` — in `share()`, add `'auth' => ['user' => $request->user()]` so the frontend can read login state. This uses the default guard; session logins satisfy `auth:sanctum` because Sanctum's guard falls back to the session driver for cookie/session requests.

intended behavior

- No changes to `config/auth.php` or `bootstrap/app.php` are expected; Sanctum registers its guard at runtime. If `auth:sanctum` misbehaves, verify with `php artisan route:list` + a guard test rather than editing auth config speculatively.

## Verification

- `php artisan test --compact tests/Feature/AuthPagesTest.php` — should reflect failure from the route-shape defect (not Sanctum install errors), confirming nothing broke.
- Quick guard smoke-test in slice 05's protected-route test.