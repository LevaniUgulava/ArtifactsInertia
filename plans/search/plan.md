# Search Plan

## Commit Status

Pending explicit approval — this commit covers the plan scaffold, the search reference screenshot, and the current search-modal frontend work.

## Outcome

Provide a focused search experience across the storefront: a search modal in the header that submits a localized query to the existing catalog search, keeping the catalog page as the results surface.

## Reference Resources

Reference material in [`resources/`](resources/): `Screenshot 2026-09-22 at 13.18.02.png`.

## Slices

Feature slices belong in [`slices/`](slices/) and will be added as the scope is confirmed. Currently open questions:

- Whether search results stay on the catalog page (`/catalog?q=`) or get a dedicated results page.
- Whether the suggestion chips should map to existing categories/filters or remain free-form queries.

## Verification Strategy

- Focused Pest feature tests for catalog search query behavior.
- TypeScript checks and the Vite production build after frontend edits.
- `vendor/bin/pint --dirty --format agent` after any PHP edits.
- Review the search modal at mobile, tablet, and desktop widths against the reference screenshot.

## Risks / Prerequisites

- The search modal currently routes submitted queries to `catalog.url({ lang }, { query: { q } })`; confirm that remains the intended results surface.
- Brand-color tokens (`brand-*`) are assumed available from the existing branding plan.
- No new dependencies are planned.