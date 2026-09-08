# Login Screen Slice

## Commit Status

Frontend implementation and `/login` page route complete — no commit requested.

## Outcome

Define the login screen inside the shared auth shell, matching the supplied reference.

## Dependencies

- Shared auth style slice.
- Login reference screenshot in `../resources/Screenshot 2026-09-07 at 20.59.31.png`.

## User Input Required

- Inputs: `email` and `password`.
- Field configuration: `email` uses `type="email"`, label `Email Address`, and the reference placeholder `you@example.com`; `password` uses `type="password"` and label `Password`.
- Primary action: `Sign In`.
- Include the `Forgot password?` link, social sign-in buttons for Google and Apple, `Create Account` link, and the small supporting footer navigation shown in the reference.
- Preserve the reference’s `Welcome Back` heading and supporting copy unless replaced by supplied content.

## Intended Changes

- Create the login page/component using the `email` and `password` fields.
- Render both fields through the shared reusable input component, passing screen-specific names and types rather than duplicating markup.
- Reuse the shared shell and field/button styles.
- Keep submission and authentication logic out of scope until separately requested.

## Implemented File

- `resources/js/Pages/Auth/Login.tsx`

## Verification

- Confirm the exact approved fields and labels render in the correct order.
- Check responsive wrapping and keyboard navigation.
