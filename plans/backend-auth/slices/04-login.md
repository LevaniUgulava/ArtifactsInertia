# 04 — Login

## Commit Status

Not requested.

## Outcome

`POST /login` authenticates with throttled, field-error'd credential checks via a Form Request and redirects to `home` on success. Failed attempts are rate-limited per `email|ip` key.

## Dependencies

Slices 01 (Sanctum) and 02 (plain `/login` route).

## Files / Behavior

- `app/Http/Requests/Auth/LoginRequest.php`
  - `rules()`:
    - `email` => `['required', 'string', 'email']`
    - `password` => `['required', 'string']`
  - `authenticate(): void` — `Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))`; on failure call `RateLimiter::hit($this->throttleKey())` and throw `ValidationException::withMessages(['email' => trans('auth.failed')])` (guards against user enumeration by returning the same generic message for unknown email and wrong password).
  - `ensureIsNotRateLimited(): void` — throw `ValidationException::withMessages(['email' => trans('auth.throttle', ...)])` when `RateLimiter::tooManyAttempts($key, 5)`; clear the counter on successful login.
  - `throttleKey(): string` — `Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip())` (per `security.md`; account+IP keying avoids grouping users behind one IP and prevents targeted DoS).
  - `rules` and `authenticate` prefer the docs/standardized pattern (`search-docs` before finalizing for Laravel 13 syntax).
- `app/Http/Controllers/Auth/AuthController.php`
  - `login(LoginRequest $request): RedirectResponse` — `$request->authenticate(); $request->session()->regenerate();` then `redirect('/')`.
- `routes/web/auth.php` — `Route::post('/login', [AuthController::class, 'login'])->name('login');` (GET `/login` keeps name `login`; Wayfinder exposes `login.post()`).
- Generated via `php artisan make:controller Auth/AuthController --no-interaction` and `php artisan make:request Auth/LoginRequest --no-interaction`, then approved edits.

## Verification

- New `tests/Feature/Auth/AuthenticationTest.php` via `php artisan make:test --pest Auth/AuthenticationTest`:
  - Successful login: `POST /login` with a factory user's credentials → `assertAuthenticated()`, redirected to `/`.
  - Users can be authenticated with `Password::min(8)`-compliant factory password.
  - Invalid email OR wrong password → `assertSessionHasErrors('email')`, not authenticated, session not leaked (no `assertSessionHasNoErrors` on password).
  - Rate limiting: 6 rapid failed attempts → throttling error surfaced on `email`; a correct attempt within the window is still rejected.
  - Unauthenticated user hitting `/account` (slice 05) is redirected to `/login`.
- `php artisan test --compact tests/Feature/Auth/AuthenticationTest.php`
- `vendor/bin/pint --dirty --format agent`