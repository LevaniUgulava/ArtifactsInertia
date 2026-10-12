# Catalog Management Slice

## Commit Status

Committed: (pending)

## Outcome

Implement the core admin CRUD workflows for products, nested variants, categories, and collections.

## Dependencies

- Slice 01 admin access and shell.
- Slice 02 dashboard links may target these pages, but the CRUD pages can be implemented independently after the shell exists.
- Existing model fillable/cast definitions, factories, migrations, and storefront resources.

## Intended Changes

- Add admin controllers and per-action Form Requests for product, variant, category, and collection writes.
- Add Inertia resources/page props for paginated lists, search/filter state, edit forms, validation errors, and flash feedback.
- Build reusable admin table, filter, pagination, form, field, badge, confirmation, and empty-state components under the admin feature structure.
- Product forms must cover existing product fields, sex, benefits/details, categories, collections, and nested variants without trusting client totals or IDs blindly.
- Variant forms must validate SKU, color data, size, price, and stock with product ownership checks.
- Category/collection management must handle unique names/slugs and relationship cleanup safely.
- Add explicit confirmation for destructive deletes and protect records referenced by storefront relationships where appropriate.

## Verification

- Feature-test every write boundary with valid, invalid, unauthorized, and missing-record cases.
- Test pagination/search/filter behavior for product lists.
- Test nested variant persistence and relationship synchronization in transactions.
- Verify forms preserve server validation errors and do not submit hardcoded URLs.
- Run focused Pest tests, Pint, Wayfinder generation, and the frontend build.
