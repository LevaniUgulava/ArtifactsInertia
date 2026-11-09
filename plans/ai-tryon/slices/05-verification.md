# Slice 05: Verification

## Commit Status

Committed: `0cfffef`, `7bc2e2b`, `062937c`, `b9e9283`.

## Goal

Verify the complete admin try-on flow and document the live-provider setup needed for a manual end-to-end check.

## Depends on

01–04 — persistence, service, controller, routes, and page.

## Files

- Relevant focused tests under `tests/Feature/` and/or `tests/Unit/` (new or updated)
- No documentation file unless explicitly requested; setup requirements belong in this plan during planning.

## Tasks

1. Ensure provider calls are isolated behind the service and covered with HTTP fakes.
2. Cover admin authorization, image validation, saved provider IDs, newest-first history, refresh persistence, and terminal states.
3. Run the narrowest relevant Pest tests, Pint for modified PHP files, TypeScript checks, and the frontend production build.
4. Manually run one prediction with a configured FASHN key and confirm the local polling flow works without a webhook URL.

## Acceptance Criteria

- [ ] Focused automated checks cover prediction persistence and refresh without live provider requests.
- [ ] The application build and modified PHP formatting checks pass.
- [ ] A manual configured-provider run returns and displays an output image.

## Edge Cases

- Provider credits exhausted, rate limited, or request timing exceeds the frontend polling window.
- Local machine has no public webhook endpoint; local predictions still complete via polling.

## Verification

- Narrow Pest test files for the try-on feature.
- `vendor/bin/pint --dirty --format agent` after PHP changes.
- Project TypeScript and production build commands.
- Manual local run with `FASHN_API_KEY` configured.
