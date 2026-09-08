# Catalog Plan

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Implement the Atelier Street catalog page shown in the supplied reference: a public Fall/Winter collection route with filter controls, a featured collection banner, sortable product cards, an editorial banner, and pagination.

Reference: [Screenshot 2026-09-08 at 15.31.05.png](resources/Screenshot%202026-09-08%20at%2015.31.05.png)

The blue lines in the reference are treated as annotations/guides, not UI elements.

## Access and Security Requirements

- Catalog browsing is public and must be accessible to guests and authenticated users.
- Do not expose account-only controls or profile data through catalog props.
- Product, filter, sort, and pagination inputs must be validated at the server boundary once the catalog is backed by a query.
- Product image URLs and product copy must be treated as display data; no user-provided HTML should be rendered unsafely.

## Key Architectural Decisions

- Use the existing public root layout and shared Header; do not reuse the authenticated ProfileSidebar because the reference uses a dedicated catalog filter column.
- Add a dedicated catalog page with separate React components for the filter panel, collection header, featured banner, product card/grid, editorial banner, and pagination.
- Use a public localized route named `catalog`, and use Wayfinder for links and query-string navigation rather than hardcoded application URLs.
- Start with an explicit fixture-backed catalog payload because the repository currently has no product, category, inventory, or catalog query domain. Keep the payload shape ready for a later server-side product query.
- Keep filter, sort, and page state URL-addressable so refreshes and shareable catalog views remain possible when the data source becomes persistent.
- Treat the supplied screenshot as a visual target: neutral stone palette, compact typography, three-column desktop product grid, responsive single-column/mobile layout, and visible active filter controls.

## Slices

1. [01-catalog-route-and-data-contract.md](slices/01-catalog-route-and-data-contract.md) — add the public catalog route and define the fixture-backed page payload, filter options, sorting options, and pagination contract.
2. [02-catalog-filters.md](slices/02-catalog-filters.md) — build the separate responsive filter panel for category, size, color, price range, collection, apply, and clear actions.
3. [03-catalog-collection-and-products.md](slices/03-catalog-collection-and-products.md) — build the collection header, featured collection banner, product card/grid, product metadata, and image presentation.
4. [04-catalog-editorial-and-navigation.md](slices/04-catalog-editorial-and-navigation.md) — add the editorial banner, sorting control, pagination, URL state transitions, and responsive/mobile behavior.
5. [05-catalog-verification.md](slices/05-catalog-verification.md) — verify public access, payload shape, URL state, accessibility, responsive layout, tests, and build output.

## Verification Strategy

- Add feature coverage proving guests can access the localized catalog route and receive the expected page contract.
- Test accepted filter, sort, and page query values and the fallback behavior for invalid values once server-side query handling is introduced.
- Add frontend interaction coverage only if the project adopts a browser/component test tool; otherwise verify the generated Inertia page and URL transitions through the route contract and production build.
- Run focused tests after each slice, `vendor/bin/pint --dirty --format agent` after PHP edits, and `npm run build` after frontend edits.
- Review the page at desktop, tablet, and mobile widths against the supplied reference, including keyboard focus states and image alt text.

## Risks / Prerequisites

- No product or category tables, models, factories, seeders, or catalog query service currently exist. Decide whether the first implementation remains fixture-backed or introduces an approved product domain before execution.
- The screenshot implies filtering, sorting, and pagination, but their persistence and query semantics are not defined. The plan assumes deterministic fixture behavior first.
- Product detail routes are not currently present. Product cards should remain non-navigating or use a clearly defined follow-up route until product detail behavior is approved.
- Search and bag icons already exist in the shared Header, but their destination behavior is outside this catalog plan unless explicitly added during execution.
