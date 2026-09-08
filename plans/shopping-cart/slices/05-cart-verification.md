# Slice 05 — Cart Verification

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Validate the finished cart page against authorization, route, visual, and accessibility requirements.

## Dependencies

Depends on Slices 01–04, or on the subset approved for a fixture-backed first pass.

## Verification Checklist

- Run focused cart/profile/auth feature tests, then php artisan test --compact.
- Run vendor/bin/pint --dirty --format agent after PHP changes.
- Run npm run build and resolve TypeScript, Wayfinder, or manifest errors.
- Confirm the cart route is inaccessible to guests.
- Confirm the existing ProfileSidebar is the only sidebar implementation and the Cart item is active on the cart page.
- Review desktop, tablet, and mobile layouts against the supplied screenshot, ignoring blue guide lines.
- Check semantic headings, landmarks, form labels, button/link names, image alt text, keyboard focus, contrast, and no horizontal overflow.
