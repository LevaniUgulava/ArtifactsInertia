# Slice 05 — Account Settings

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Render the address book, payment methods, and preferences cards shown at the bottom of the reference, with safe action boundaries.

## Dependencies

Depends on Slice 01. Requires confirmation of which settings are read-only summaries versus editable flows and whether those domains already exist elsewhere.

## Files / Areas

- Profile data contract/controller boundary.
- Account-settings card components.
- Existing account/security routes or new routes only after their behavior is approved.
- Tests for visibility and ownership.

## Intended Behavior

- Display address, payment, and preference summaries in separate cards matching the reference.
- Mask sensitive payment data; never send or render full payment credentials.
- Provide “Edit”, “Manage Payments”, and “Sign Out” actions only when backed by existing or approved routes.
- Keep the cards usable when a section is empty, unavailable, or not configured.

## Verification

- Test that sensitive payment values are masked.
- Test authenticated ownership and guest protection.
- Test empty/unconfigured settings states.
- Confirm the cards do not introduce write actions without validation and authorization coverage.
