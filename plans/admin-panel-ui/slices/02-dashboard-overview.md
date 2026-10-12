# Dashboard Overview Slice

## Commit Status

Committed: (pending)

## Outcome

Create the admin landing page that gives an operator a quick, useful view of catalog health without duplicating the storefront.

## Dependencies

- Slice 01 admin access and shell.
- Existing Product, Variant, Category, Collection, and media relationships.

## Intended Changes

- Add an admin dashboard controller/action that returns only authorized, aggregate data.
- Provide summary cards for product, variant, category, collection, and low/out-of-stock counts.
- Add a small recent-products or recently-updated catalog list with links to the relevant admin edit pages.
- Add intentional loading, empty, and error states for dashboard cards.
- Keep queries aggregate/eager-loaded to avoid N+1 behavior and avoid exposing full catalog payloads on the dashboard.

## Verification

- Feature-test dashboard authorization and representative counts with factories.
- Verify empty catalog behavior and low-stock edge cases.
- Check that dashboard queries remain bounded and that links resolve through Wayfinder.
- Verify responsive card/table layout and readable Georgian/English text.
