# Slice 01: Prediction History Storage

## Commit Status

Committed: `0cfffef`.

## Goal

Persist each FASHN prediction ID, latest status, result URL, and timestamps so the admin page can show history after navigation or reload.

## Depends on

None.

## Files

- `database/migrations/*_create_tryon_predictions_table.php` (new)
- `app/Models/TryonPrediction.php` (new)
- `database/factories/TryonPredictionFactory.php` (new)
- `database/seeders/TryonPredictionSeeder.php` (new; explicit demo seeding only)

## Tasks

1. Create a prediction table with a unique provider prediction ID, status, nullable result URL, and timestamps; index creation time for newest-first history queries.
2. Add an Eloquent model using the project's `#[Fillable]` convention.
3. Add factory states useful for pending, completed, and failed history tests; keep demo records out of normal production seeding.
4. Persist no input or output image files, per the user's choice.

## Acceptance Criteria

- [ ] Provider IDs are unique and stored independently of the local row ID.
- [ ] Status, nullable result URL, and timestamps persist and can be updated.
- [ ] History can be sorted by creation time descending.

## Edge Cases

- Multiple predictions share a creation timestamp; use the local row ID as a deterministic secondary order.
- A prediction is pending or failed and has no result URL.

## Verification

- Run the focused migration-backed feature tests for create, update, and ordered retrieval.
