# Admin Panel UI Plan

## Commit Status

Committed: (pending)

## Outcome

Replace the removed Filament admin panel with a custom, authenticated Inertia React admin area under `/admin` for managing the storefront catalog. The first release will match the supplied dashboard reference in composition and visual hierarchy: persistent left navigation, branded admin surface, toolbar, KPI cards, analytics panels, and product-focused content, followed by CRUD workflows for products, variants, categories, collections, and their media relationships.

## Assumptions

- The admin panel will live under an `/admin` route namespace and use Inertia React pages, not Blade or Filament.
- Admin access currently uses the existing authenticated-and-verified session boundary. A separate permission system will be supplied later and must be added before exposing the panel to broader staff accounts.
- The first release is catalog administration. The reference's Orders, Support, Customers, Offers, Newsletter, and Settings items are not new feature requirements; only implemented catalog destinations may be actionable until separately requested.
- Existing storefront models, media collections, translations, Wayfinder generation, and Tailwind conventions remain the source of truth.

## Architectural Decisions

- Use a dedicated admin layout under `resources/js/Layouts/Admin/` with the reference's persistent desktop sidebar, compact mobile navigation, branded mark, active mint-highlighted navigation item, top toolbar, page title, breadcrumbs, and shared page feedback.
- Keep admin URLs unlocalized and prefixed with `/admin`; storefront language prefixes and the public `RootLayout` do not wrap admin pages.
- Keep admin controllers, Form Requests, policies/middleware, and API/Inertia resources under the existing Laravel feature conventions.
- Use Wayfinder-generated route functions for all React-to-Laravel navigation and form submissions.
- Reuse existing `Product`, `Variant`, `Category`, `Collection`, and Media Library behavior rather than introducing an admin-specific data model.
- Use server-side validation and authorization for every write; the React UI is not the security boundary.

## Slices

1. [01-admin-access-and-shell.md](slices/01-admin-access-and-shell.md) — establish admin authorization, `/admin` route grouping, and the reference-matched responsive Inertia admin layout.
2. [02-dashboard-overview.md](slices/02-dashboard-overview.md) — add the admin landing page with useful catalog counts and recent activity summaries.
3. [03-catalog-management.md](slices/03-catalog-management.md) — implement product, variant, category, and collection list/create/edit/delete workflows.
4. [04-media-and-relationships.md](slices/04-media-and-relationships.md) — connect media uploads, previews, category/collection assignment, and safe relationship updates.
5. [05-verification-and-qa.md](slices/05-verification-and-qa.md) — cover authorization boundaries, feature tests, frontend build checks, and responsive/admin usability QA.

## Verification Strategy

- Feature-test guest, regular-user, and authorized-admin access to the admin route group.
- Feature-test validation, authorization, CRUD persistence, relationship syncing, and media upload boundaries.
- Run focused Pest tests after each slice, then `php artisan test --compact` for the completed feature.
- Run `vendor/bin/pint --dirty --format agent` after PHP changes.
- Run `npm run build` and verify Wayfinder generation/type safety after route/controller changes.
- Manually verify desktop, tablet, and mobile admin layouts, keyboard navigation, focus states, empty states, validation errors, and destructive-action confirmation.

## Risks and Prerequisites

- The admin authorization model must be confirmed before implementation; a boolean `is_admin` is the smallest likely change, but a role system may be preferable if more staff roles are planned.
- Media uploads depend on the configured filesystem and existing Media Library conversions; storage permissions and image processing must be available in the target environment.
- Product editing spans nested variants and media, so writes should be transactional and tested for partial-failure behavior.
- Existing storefront data should be backed up before exercising destructive admin actions in a shared database.
