# Slice 03: Admin Controller and Routes

## Commit Status

Committed: `0cfffef`, `7bc2e2b`, `062937c`.

## Goal

Expose the try-on page and its start/status/credits endpoints through a dedicated controller inside the existing protected admin route group.

## Depends on

01–02 — Prediction model and FASHN service contract.

## Files

- `app/Http/Controllers/TryonController.php` (new)
- `app/Services/TryonService.php` (new)
- `app/Http/Resources/Tryon/TryonPredictionResource.php` (new)
- `app/Http/Requests/Tryon/StartTryonRequest.php` (new)
- `routes/web/admin.php` (edit)
- Focused controller/feature tests (new, location follows existing test conventions)

## Tasks

1. Keep history retrieval, prediction creation, and status persistence in `TryonService`, using `FashnTryonService` only for provider requests.
2. Inject `TryonService` into `TryonController` through its constructor.
3. Use `TryonPredictionResource` for both single prediction responses and the history collection.
4. Keep controller actions focused on Inertia/JSON responses, validated request data, route model binding, and HTTP error translation.
5. Register named start and refresh routes in the existing `auth`, `verified`, and `role:admin` group.
6. Cover page rendering, authorization, validation, persistence, refresh, and provider error handling.

## Acceptance Criteria

- [ ] The dedicated controller returns the expected Inertia component.
- [ ] Try-on endpoints are only available inside the existing protected admin route group.
- [ ] Each provider ID is saved and refresh updates its persisted status and result URL.
- [ ] Input validation is in a Form Request rather than inline controller validation.
- [ ] Provider credentials and raw exception details are not included in responses.

## Edge Cases

- Guest, unverified, or non-admin user requests.
- Missing, unsupported, oversized, or malformed image uploads.
- Missing local prediction or provider status lookup failure.

## Verification

- Focused Pest feature tests for route access, page component, validation, and JSON contracts.
- Inspect the route list for the new named admin routes.
