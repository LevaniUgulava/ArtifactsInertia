# Slice 06 — Verification and Responsive QA

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Validate the complete profile dashboard against the supplied reference and the application’s auth/navigation contracts.

## Dependencies

Depends on Slices 01–05, or on the subset approved for the first implementation pass.

## Verification Checklist

- Run focused profile/auth feature tests, then `php artisan test --compact`.
- Run `vendor/bin/pint --dirty --format agent` if PHP files changed.
- Run `npm run build` and resolve TypeScript, route-generation, or manifest errors.
- Verify `/account` redirects guests and renders only the authenticated user’s data.
- Review desktop composition against the supplied screenshot, ignoring its blue guide lines.
- Review tablet/mobile behavior: sidebar collapse, card stacking, readable order rows, usable action buttons, and no horizontal overflow.
- Check semantic headings, landmarks, button/link labels, image alt text, keyboard focus, and color contrast.
