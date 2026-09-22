# Brand Logic

## Commit Status

Not requested

## Outcome

Ensure the approved ARTIFACTS identity is consistently used wherever the application currently exposes brand-visible data or shared presentation logic.

## Dependencies

- Slice 01 brand tokens.
- Confirmed scope: centralized identity data and propagation only.

## Intended Changes

- Identify and centralize the brand name, wordmark/mark references, tagline, default document-title suffix, and brand-visible accessibility labels.
- Update shared layouts and page `Head` titles so the application consistently uses the approved brand name rather than “Atelier Street”.
- Update English and Georgian translation namespaces for brand-visible copy while preserving the existing locale synchronization flow.
- Remove duplicated hardcoded brand strings and temporary brand-specific values where a shared source is appropriate.
- Do not add business rules, database fields, or brand administration features unless explicitly requested.

## Verification

- Search the codebase for stale “Atelier Street” references and classify intentional historical/email copy versus references that must change.
- Verify document titles, auth copy, shared layouts, and accessibility labels in English and Georgian.
- Run affected feature tests, TypeScript checks, and the production build.
