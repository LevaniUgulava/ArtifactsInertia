# Slice 05 — Checkout Verification

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Validate the complete checkout flow against access control, payment safety, visual requirements, and the application conventions.

## Dependencies

Depends on Slices 01–04, or on the subset approved for a fixture-backed first pass.

## Verification Checklist

- Run the full authorization matrix: guest, unverified authenticated, and verified authenticated user.
- Run focused checkout and auth feature tests, then php artisan test --compact.
- Run vendor/bin/pint --dirty --format agent after PHP changes.
- Run npm run build and resolve TypeScript, Wayfinder, or manifest errors.
- Confirm checkout cannot be reached or submitted by an unverified user.
- Confirm the checkout page does not create a second sidebar and uses the intended shared Header.
- Review desktop, tablet, and mobile layouts against the supplied screenshot, ignoring blue guide lines.
- Check semantic headings, form labels, error messages, keyboard focus, selected states, contrast, image alt text, and no horizontal overflow.
