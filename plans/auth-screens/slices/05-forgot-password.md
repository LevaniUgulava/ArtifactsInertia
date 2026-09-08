# Password Recovery / Update Screen Slice

## Commit Status

Frontend implementation and `/password/update` page route complete — no commit requested.

## Outcome

Define the password-update screen inside the shared auth shell, including its password fields, action, and states.

## Dependencies

- Shared auth style slice.
- Login reference screenshot in `../resources/Screenshot 2026-09-07 at 20.59.31.png`; password update uses the same visual shell.

## User Input Required

- Inputs: `password` and `password_confirmation` (assuming “configuration” means password confirmation).
- Field configuration: both fields use `type="password"`, distinct labels, and the shared input component; the confirmation field must be associated with `password_confirmation`.
- Primary action, instructions, and return-to-login link remain pending confirmation.
- The distinction between a forgot-password email request and this password-update form remains to be confirmed.

## Intended Changes

- Create the password-update page/component using `password` and `password_confirmation` once the flow distinction is confirmed.
- Render both password fields through the shared reusable input component.
- Reuse the shared shell and form presentation styles.
- Keep reset-token generation, mail delivery, and backend validation out of scope until separately requested.

## Implemented File

- `resources/js/Pages/Auth/UpdatePassword.tsx`

## Verification

- Confirm the approved field and copy render clearly at all target widths.
- Check the password confirmation state and return navigation presentation.
