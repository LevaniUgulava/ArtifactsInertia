# Slice 02: FASHN Service and Configuration

## Commit Status

Committed: `0cfffef`, `7bc2e2b`, `062937c`.

## Goal

Create a server-side service for starting and checking FASHN try-on predictions, with optional prompt support, credit lookup, a normalized result contract, and no webhook URL in the local flow.

## Depends on

01 — Prediction history schema.

## Files

- `app/Services/FashnTryonService.php` (existing)
- `config/services.php` (edit)
- `.env.example` (edit, if provider keys are documented there)
- Focused service tests (new, location follows existing test conventions)

## Tasks

1. Add FASHN base URL and API key configuration, reading the secret from an environment variable and keeping it server-side.
2. Keep the service method that submits `model_name: tryon-max` and the agreed image inputs to `POST /v1/run`, omitting `webhook_url`.
3. Ensure the status method accepts the stored provider prediction ID and calls `GET /v1/status/{predictionId}`, normalizing status, output URL, and error details.
4. Add a credits method that calls `GET /v1/credits` and validates the total, subscription, and on-demand values.
5. Forward a non-empty optional prompt as `inputs.prompt`; omit it when empty.
6. Handle connection failures, non-success HTTP responses, malformed responses, and provider runtime failure states without leaking credentials.
7. Add focused tests that fake HTTP responses for accepted predictions, status transitions, credits, completion, and API errors.

## Acceptance Criteria

- [ ] FASHN credentials are read only by Laravel configuration and never returned to the client.
- [ ] The run request uses the configured base URL, bearer authentication, JSON body, `tryon-max`, and no webhook query parameter.
- [ ] Start/status responses have a stable application-level shape independent of raw provider responses.
- [ ] HTTP failures and provider failures become actionable, safe application errors.

## Edge Cases

- Missing API key or malformed provider response.
- Provider returns an immediate request error versus an accepted prediction that later fails.
- Connection timeout and unexpected status value.

## Verification

- Focused Pest coverage with Laravel HTTP fakes; no live API key required.
- Run Pint for modified PHP files.
