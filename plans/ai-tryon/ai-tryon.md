# Feature: Functional AI Try-On

## Commit Status

Committed: `0cfffef` (core flow), `7bc2e2b` (credits), `062937c` (optional prompt), `b9e9283` (10 MB limit).

## Overview

Add an admin-only AI try-on tool. An administrator opens a dedicated page, supplies the two requested images, starts a FASHN `tryon-max` prediction, and sees the generated result or a useful failure state. Laravel owns the FASHN request and API key; the page communicates only with the application.

## Scope

- In scope: admin navigation entry and page, image previews, an optional customization prompt, starting predictions, persisted prediction history, manual and automatic status refresh, displaying the available FASHN credit total, showing cached result URLs, and focused verification.
- Out of scope: storefront/customer try-on, storing input or generated image files locally, a production webhook receiver, and additional FASHN models or parameters.

## Architecture Decisions

- Use a dedicated `TryonController` to render the Inertia page and handle the try-on application endpoints; follow the existing admin route group protected by `auth`, `verified`, and `role:admin` middleware in `routes/web/admin.php`.
- Keep FASHN HTTP details and response normalization in a dedicated service. Read the API key from server configuration/environment; never expose it to the browser.
- For local development, omit `webhook_url` from `POST https://api.fashn.ai/v1/run`. Return the prediction ID, then poll the FASHN status endpoint through an application endpoint until it completes or fails. Avoid holding a single web request open for the full prediction.
- Use the `tryon-max` model and the API request shape `inputs.model_image` plus `inputs.product_image`, with optional `inputs.prompt`, based on the [FASHN Try-On Max API reference](https://docs.fashn.ai/api-reference/tryon-max). The UI uses a person photo for `model_image` and a garment/product photo for `product_image`.
- Send temporary uploads as base64 data URLs. The app caps each image at 10 MB; do not persist uploads or results.
- Persist the provider prediction ID, current status, result URL, and timestamps. Refresh a saved record through an authenticated application action that passes its provider ID to FASHN's `GET /v1/status/{id}` and stores the latest status and first output URL.
- Display prediction history ordered by `created_at` descending. Keep only the FASHN result URL as requested; FASHN schedules default CDN outputs for expiry after three days. See [FASHN data retention](https://docs.fashn.ai/api-overview/data-retention-privacy).
- Store `FASHN_API_KEY` and the optional `FASHN_API_BASE_URL` in environment configuration, exposing only the server-side `services.fashn` values to Laravel.
- Load the FASHN credit total when the admin page opens and refresh it after a prediction completes; show only the total in the page header.

## Slices

| # | Slice | Depends on | Outcome |
|---|-------|------------|---------|
| 01 | [Prediction history storage](./slices/01-prediction-history-storage.md) | — | Database model and timestamp-sorted prediction records |
| 02 | [FASHN service and configuration](./slices/02-fashn-service.md) | 01 | Server-side FASHN request/status client with normalized results and errors |
| 03 | [Admin controller and routes](./slices/03-admin-controller-and-routes.md) | 01–02 | Protected Inertia page, start, and refresh endpoints |
| 04 | [Admin try-on page](./slices/04-admin-tryon-page.md) | 03 | Navigation entry, image inputs/previews, prediction history, refresh controls, and results |
| 05 | [Verification](./slices/05-verification.md) | 01–04 | Focused feature coverage and manual integration checks |

## Acceptance Criteria

- [ ] An authorized admin can open the try-on page from the admin navigation; non-admin access is rejected by the existing admin middleware.
- [ ] The page presents the two agreed image inputs and displays previews for selected uploads.
- [ ] An optional prompt is sent inside `inputs.prompt` when provided; an empty prompt does not prevent a prediction request.
- [ ] The FASHN total credit count loads on page entry and refreshes after a completed prediction.
- [ ] Each image is limited to 10 MB in both client and server validation.
- [ ] The backend starts a `tryon-max` prediction without a webhook URL in local mode and keeps the API key server-side.
- [ ] Each start saves the provider prediction ID; refresh actions retrieve and persist the latest provider status and result URL.
- [ ] The prediction history displays newest first and refresh controls work for previously saved records.
- [ ] Completed output is displayed; validation, provider, and runtime failures are presented clearly.
- [ ] Input images are not saved; persisted output is only the provider result URL, not a local image copy.

## Open Questions

None currently. A live provider check remains pending until `FASHN_API_KEY` is configured locally.

## Implementation Order

Prediction persistence, FASHN refresh, admin history UI, and focused tests are implemented. A live-provider check remains pending until `FASHN_API_KEY` is configured locally.
