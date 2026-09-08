# 05 — Logout and Protected Route

## Commit Status

Not requested.

## Outcome

`POST /logout` ends the session securely, and a protected `/account` route demonstrates `auth:sanctum` by requiring an authenticated user.

## Dependencies

Slices 01 (Sanctum), 03 and 04 (controller naming/conventions in place).

## Files / Behavior

- `app/Http/Controllers/Auth/AuthController.php`
  - `logout(Request $request): RedirectResponse` — `Auth::logout(); $request->session()->invalidate(); $request->session()->regenerateToken();` then `redirect('/')` (fresh token prevents reuse of the logged-out session).
- `routes/web/auth.php` — add:
  - `Route::post('/logout', [AuthController::class, 'logout'])->name('logout');`
  - `Route::get('/account', fn () => Inertia::render('Home/Home'))->middleware('auth:sanctum')->name('account');`
    - Temporary page: reuses `Home/Home` until a real account page is planned (frontend out of scope). The point is the `auth:sanctum` guard, which falls back to the session driver, so users logged in via slice 03/04 pass.
- No config changes: `auth:sanctum` uses the Sanctum-registered guard; verified by test rather than assumption.

## Verification

- New `tests/Feature/Auth/LogoutTest.php`:
  - Logout: acting user posts `POST /logout` → `assertGuest()`, session invalidated (`assertSessionMissing('login_web_...')`), redirected to `/`.
  - Protected route: guest `GET /account` → redirected to `/login`; authenticated user `GET /account` → 200 Inertia response.
  - After logout, `GET /account` → redirected to `/login`.
- `php artisan test --compact tests/Feature/Auth/`
- Full suite: `php artisan test --compact`
- `vendor/bin/pint --dirty --format agent`
- `php artisan route:list --except-vendor` — confirm `account` shows `auth:sanctum` middleware.