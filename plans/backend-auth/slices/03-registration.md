# 03 — Registration

## Commit Status

Not requested.

## Outcome

`POST /register` validates input via a Form Request, creates the user, logs them in (Sanctum-compatible session), regenerates the session to prevent fixation, and redirects to `home`.

## Dependencies

Slices 01 (Sanctum installed) and 02 (plain `/register` route in place).

## Files / Behavior

- `app/Http/Requests/Auth/RegisterRequest.php`
  - `authorize(): true` — can be removed since its unused.
  - `rules()` — array syntax:
    - `username` => `['required', 'string', 'max:255']` (frontend field; stored as `name`)
    - `email` => `['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique('users', 'email')]`
    - `password` => `['required', 'confirmed', Password::min(8)]`
  - Only `username`, `email`, `password` are validated.
- `app/Http/Controllers/Auth/AuthController.php` — `register(RegisterRequest $request): RedirectResponse`
  - Build user from validated data; do **not** pass `$request->all()`.
  - ```php
    $user = User::create([
        'name' => $request->validated('username'),
        'email' => $request->validated('email'),
        'password' => $request->validated('password'),
    ]);
    ```
  - `Auth::login($user);`
  - `$request->session()->regenerate();`
  - `return redirect('/');` (resolves to `/en` via `Route::redirect`; no `lang` param needed)
- `routes/web/auth.php` — add `Route::post('/register', [AuthController::class, 'register'])->name('register');` next to the GET route (same name across verbs is the Laravel convention; Wayfinder generates `register.post()` while `register.url()` keeps working for the existing frontend links).
- Generated via `php artisan make:controller Auth/AuthController --no-interaction` and `php artisan make:request Auth/RegisterRequest --no-interaction`, then approved edits.

## Verification

- New `tests/Feature/Auth/RegistrationTest.php` via `php artisan make:test --pest Auth/RegistrationTest`:
  - Can register: `POST /register` with valid `username`, unique `email`, `password` + `password_confirmation` → user in DB (`assertDatabaseHas('users', ['email' => ...])`), `assertAuthenticated()`, redirected to `/`.
  - Validation errors: missing `username`; invalid email; duplicate email; password `< 8`; mismatched confirmation (`password_confirmation`) — `assertSessionHasErrors`.
  - Password stored hashed: `assertNotSame($requestPassword, $user->fresh()->password)`.
- `php artisan test --compact tests/Feature/Auth/RegistrationTest.php`
- `vendor/bin/pint --dirty --format agent`
