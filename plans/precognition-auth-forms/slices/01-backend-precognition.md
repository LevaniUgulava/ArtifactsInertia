# 01 — Backend Precognition

## Commit Status

Not requested.

## Outcome

The `POST /login` and `POST /register` routes accept Precognition validation requests (header `X-Precognition`) and reply with validation results without executing the controller. Tests prove the behavior.

## Dependencies

Prior auth work (Form Requests, routes) must already exist.

## Files / Behavior

- `bootstrap/app.php` — register the `precognition` middleware alias:
  ```php
  $middleware->alias([
      'precognition' => \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
  ]);
  ```
- `routes/web/auth.php` — wrap both POST routes in a `precognition` middleware group:
  ```php
  Route::middleware('precognition')->group(function () {
      Route::post('/register', [AuthController::class, 'register'])->name('register');
      Route::post('/login', [AuthController::class, 'login'])->name('login');
  });
  ```
- No changes to `RegisterRequest` / `LoginRequest`: validation rules already cover everything; `authenticate()` (login side-effects) is only invoked by the controller on a real submission.

## Verification

> Note: Precognition tests must send `Accept: application/json` (as the real Inertia client does). Without it, `shouldReturnJson`/`expectsJson` is false for a test POST and the validation failure returns a redirect instead of the precognition 422. The `withPrecognition()` header alone is not enough.

- `tests/Feature/Auth/RegistrationTest.php` — add:
  - `it('allows a precognition request without creating a user')` → `withHeader('Accept', 'application/json')` + `withPrecognition()->post('/register', [valid payload])` → `assertSuccessfulPrecognition()`; `expect(User::count())->toBe(0)`.
  - `it('returns validation errors for a precognition request')` → with JSON Accept + `withPrecognition()->post('/register', [invalid email + short + mismatched password])` → `assertUnprocessable()` + `assertJsonValidationErrors(['email', 'password'])`; `User::count()` stays 0.
- `tests/Feature/Auth/AuthenticationTest.php` — add:
  - `it('allows a precognition request without authenticating')` → factory user; JSON Accept + `withPrecognition()->post('/login', [valid creds])` → `assertSuccessfulPrecognition()`; `assertGuest()`.
- Run `php artisan test --compact tests/Feature/Auth/`.
- `vendor/bin/pint --dirty --format agent` (PHP files only changed in this slice).