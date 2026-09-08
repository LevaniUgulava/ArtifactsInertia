# 02 — Auth Route Shape

## Commit Status

Not requested.

## Outcome

Auth GET pages resolve at plain `/login`, `/register`, `/verification`, `/password/update` (matching the existing `AuthPagesTest`, which is currently failing because `/login` matches the `/{lang}` home wildcard). This slice also fixes route ordering so the auth routes win over the `/{lang}` catch-all, and establishes where the `POST` auth routes will live.

## Dependencies

None (independent; done before or alongside slice 01).

## Files / Behavior

- `routes/web/auth.php` — remove the `Route::prefix('{lang}')` group; register the four GET routes at `/login`, `/register`, `/verification`, `/password/update` with their existing names. Placeholders here (same closures rendering `Auth/*` pages) — POST routes arrive in slices 03–05.
- `routes/web.php` — move `require __DIR__.'/web/auth.php';` **above** the `Route::get('/{lang}', ...)` home route so the auth slugs are matched first. Keep `Route::redirect('/', '/en')` first.
- No controller or request changes in this slice.

route list after this slice (auth portion):

- `GET|HEAD /login -> login`
- `GET|HEAD /register -> register`
- `GET|HEAD /verification -> verification`
- `GET|HEAD /password/update -> password.update`
- `GET|HEAD /{lang} -> home`

## Verification

- `php artisan test --compact tests/Feature/AuthPagesTest.php` — all 4 tests green (this proves the fix; currently 4 failing).
- `php artisan route:list --except-vendor` — confirm `/login` etc. are no longer under `{lang}` and that `/en` still hits `home`.
- `php artisan test --compact tests/Feature/HomePageTest.php` — home must still render through the `/{lang}` wildcard.