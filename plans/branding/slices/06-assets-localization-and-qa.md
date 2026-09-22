# Assets, Localization, and Visual QA

## Commit Status

Not requested

## Outcome

Finish the branding pass with approved assets, localized copy, and repeatable visual verification.

## Dependencies

- Slices 01–05.
- Final files and copy supplied in `plans/branding/resources/`.

## Intended Changes

- Add approved local logos, fonts, icons, favicon variants, and imagery in established asset locations.
- Update English and Georgian translations for brand-visible labels, navigation, buttons, footer text, page titles, and accessibility labels.
- Verify contrast, focus indicators, image alt text, and reduced-motion behavior where animations are introduced.
- Remove temporary placeholders only after approved replacements are available.

## Verification

- Run affected Pest feature tests.
- Run TypeScript checks and `npm run build`.
- Perform visual QA at reference, mobile, tablet, and wide desktop widths.
- Check both `en` and `ka` routes for wrapping, overflow, and preserved navigation.
