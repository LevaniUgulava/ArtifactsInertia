# Slice 04: Admin Try-On Page

## Commit Status

Committed: `0cfffef`, `7bc2e2b`, `b9e9283`.

## Goal

Add an admin page linked from the sidebar that lets an administrator select the two images, optionally customize the prediction with a prompt, preview the images, follow progress, see the FASHN credit total, and view the resulting image or an error.

## Depends on

03 — controller routes and response contracts.

## Files

- `resources/js/Pages/Admin/Tryon/Tryon.tsx` (new)
- `resources/js/Pages/Admin/Tryon/TryonTypes.ts` (new; follow the applicable feature-local typing convention)
- `resources/js/Pages/Admin/Tryon/hooks/useTryon.ts` (new)
- `resources/js/Layouts/Admin/AdminSidebar/hooks/useAdminSidebar.ts` (edit)
- `resources/js/Layouts/Admin/AdminSidebar/AdminSidebarTypes.ts` (edit only if the icon typing needs adjustment)
- Generated Wayfinder route/action files, if used by the project generation workflow

## Tasks

1. Add a Try-On sidebar entry that uses the generated named-route helper and matches existing active-navigation behavior.
2. Build two image upload controls using the final agreed labels and roles; show selected image previews and allow replacing/removing selections.
3. Keep form state, image preview lifecycle, route calls, polling, and handlers in a feature-local hook; keep the TSX page focused on rendering.
4. Submit the validated inputs, show progress while polling, and display completed output.
5. Render saved predictions newest first with status, creation time, result image when available, and a per-record refresh button.
6. Update the matching history entry after refresh and show provider runtime errors.
7. Handle page teardown and terminal states so polling stops after completion or failure.
8. Load the total FASHN credits when opening the page and retrieve them again after a prediction completes.
9. Enforce and display the 10 MB image limit.

## Acceptance Criteria

- [ ] The page is reachable from the admin sidebar and uses the shared admin layout.
- [ ] Both image previews are visible before submission and update when an input changes.
- [ ] Submit remains unavailable until both required images are selected.
- [ ] Progress is visible while the prediction runs; polling stops on completed or failed status.
- [ ] Completed output is shown, and failures can be understood and retried.
- [ ] Saved results remain visible after page reload using the stored provider URL.
- [ ] Each history entry has a refresh button that retrieves and updates its latest provider state.
- [ ] TSX contains no form state, effects, route calls, or event-handler logic outside the co-located hook.

## Edge Cases

- User replaces an image while an old preview URL exists; release obsolete object URLs.
- User navigates away during polling.
- Duplicate submission, slow status responses, failed prediction, or missing output URL.

## Verification

- TypeScript check and production frontend build.
- Manual responsive check of image selection, previews, progress, success, and failure states.
