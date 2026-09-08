# Slice 01 — Profile Route and Shell

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Turn the protected `/account` route into a dedicated Inertia profile dashboard entry point with a responsive shell matching the reference.

## Dependencies

None. This slice establishes the surface used by all later slices.

## Files / Areas

- `app/Http/Controllers/Auth/AuthController.php` or a profile-specific controller, following the existing controller convention.
- `routes/web/auth.php` and generated Wayfinder route files.
- `resources/js/Pages/Profile/Profile.tsx` and profile-specific components/layouts under the existing `resources/js` structure.
- Existing Tailwind and Inertia conventions.

## Intended Behavior

- Keep the route behind `auth:sanctum` and retain the `account` route name.
- Render a profile page rather than `Home/Home`.
- Build the desktop composition shown in the reference: top brand bar, left account navigation, main content column, and a mobile layout that remains usable without the sidebar.
- Keep the shell presentational; section-specific data and actions are supplied by later slices.
- Include page title metadata and preserve the existing locale-aware URL behavior.

## Verification

- Feature test: authenticated users receive the profile Inertia component.
- Feature test: guests are redirected to the localized login page.
- Frontend build succeeds and generated Wayfinder imports resolve.
- Manually compare shell spacing, borders, typography, and responsive navigation with the reference.
