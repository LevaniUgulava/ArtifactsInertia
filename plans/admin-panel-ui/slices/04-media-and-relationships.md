# Media and Relationships Slice

## Commit Status

Committed: (pending)

## Outcome

Make catalog editing practical by supporting media previews/uploads and reliable category/collection assignment.

## Dependencies

- Slice 03 catalog management forms and write endpoints.
- Existing Spatie Media Library collections/conversions on Variant and Collection.

## Intended Changes

- Add server-side upload validation for supported image types, size limits, and ownership context.
- Add product-variant image upload/remove/reorder behavior using existing `images` media collections and `preview` conversions.
- Add collection media management using the existing Collection media implementation, without reintroducing the removed Filament plugin.
- Return stable media metadata for admin previews, including URL, alt text, ordering, and media ID where needed.
- Make relationship assignment controls searchable and resilient to stale/deleted related records.
- Ensure media and relationship writes are transactional where a single admin action changes multiple records.

## Verification

- Feature-test valid/invalid uploads, unauthorized media removal, conversion URL responses, and relationship sync.
- Verify failed uploads do not leave partial records or orphaned relationships.
- Check previews, keyboard-accessible remove controls, alt text, and mobile layout.
- Confirm storefront product/catalog responses still render the resulting media correctly.
