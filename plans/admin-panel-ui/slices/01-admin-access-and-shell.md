# Admin Access and Shell Slice

## Commit Status

Committed: (pending)

## Outcome

Provide a secure `/admin` entry point and a reusable responsive admin layout that matches the supplied dashboard reference for all future admin pages.

## Dependencies

- Existing authentication and verified-user flow; admin routes are unlocalized and do not require the storefront `{lang}` prefix.
- Existing authenticated-and-verified session flow; a separate permission decision is deferred until the user supplies it.
- Inertia React, Tailwind CSS, and Wayfinder conventions already used by the storefront.

## Intended Changes

- Keep the current authenticated-and-verified route boundary without adding an `is_admin` field or middleware; leave a clear seam for the future permission system.
- Add named `/admin` routes and a minimal admin controller/page contract for the shell and dashboard, keeping route names grouped under an admin namespace.
- Create `resources/js/Layouts/Admin/` with the reference composition: a persistent light sidebar with brand mark and icon navigation; active Dashboard styling; a main surface with page title, search/date toolbar, content grid, and responsive mobile navigation.
- Keep the Inertia page tree functional and explicit: `Pages/Admin/Main`, `Pages/Admin/Products`, `Pages/Admin/Categories`, `Pages/Admin/Collections`, and `Pages/Admin/Media`; use `Pages/Admin/Components` only for shared admin presentation.
- Define the initial actionable navigation around Dashboard, Products, Categories, Collections, and Media. Do not add backend routes for reference-only destinations such as Orders, Customers, Offers, Newsletter, or Settings.
- Establish reusable admin surface primitives for navigation items, KPI cards, panel containers, toolbar controls, and product preview cards so later slices extend the same layout rather than creating page-specific shells.
- Ensure the layout supports the dashboard's wide desktop density while collapsing to a usable single-column/mobile navigation pattern without horizontal overflow.
- Add shared admin page types and localized labels in the existing locale structure.
- Use `cn` for conditional sidebar, active-state, and responsive class composition; avoid long inline template-string class expressions.
- Generate and use Wayfinder functions for admin routes.

## Verification

- Feature tests prove guest, authenticated, and unverified-user behavior.
- Confirm direct navigation and Inertia navigation preserve the admin shell at `/admin` and on nested admin pages.
- Verify the reference composition at desktop widths: sidebar, toolbar, KPI row, panel grid, and product strip align without clipping; verify the mobile layout collapses cleanly.
- Verify only implemented catalog destinations are actionable, with keyboard access, visible focus, active route styling, and clear disabled/omitted behavior for out-of-scope reference items.
- Run Pint, focused tests, Wayfinder generation/type checks, and the frontend build.
