# Slice 03 — Footer Localization and QA

## Outcome

Finalize concise localized copy and verify the footer against the supplied reference across supported viewports.

## Dependencies

Depends on Slice 02.

## Files / Areas

- `resources/js/locales/en/footer.json`
- `resources/js/locales/ka/footer.json`
- Footer component accessibility and responsive classes.

## Intended Behavior

- English and Georgian copy have matching key structures for the intro, quick links, legal links, and social labels.
- Copy remains short enough to preserve the screenshot’s whitespace and hierarchy.
- Footer landmarks, navigation labels, icon labels, and focus states are usable with keyboard and screen readers.

## Verification

- Verify both locales at mobile, tablet, and desktop widths.
- Check for missing translation keys and visual overflow.
- Run `npm run build`.
- Run focused frontend tests if the final footer includes interactive behavior beyond links.

## Commit Status

Not requested — planning only.
