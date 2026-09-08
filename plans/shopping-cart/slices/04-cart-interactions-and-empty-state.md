# Slice 04 — Cart Interactions and Empty State

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Define the cart’s user-visible state transitions and make the screen complete for both populated and empty carts.

## Dependencies

Depends on Slices 02 and 03. Persistence-specific behavior depends on the approved cart storage contract.

## Intended Behavior

- Quantity updates refresh the affected line and summary consistently.
- Remove updates the list and totals, with an appropriate success/error response.
- Save-for-later has a defined outcome or remains clearly non-functional until that domain exists.
- An empty cart replaces the item list and summary with a concise empty state and a generated Continue Shopping link.
- Loading, validation, and failure states do not leave stale totals or ambiguous buttons.

## Verification

- Test the empty-cart response contract.
- Test each state transition at the chosen implementation boundary.
- Verify the Continue Shopping action returns to the existing catalog/home route.
- Confirm the page remains usable with one item, many items, and long content.
