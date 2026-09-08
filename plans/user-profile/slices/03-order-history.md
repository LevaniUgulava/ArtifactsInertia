# Slice 03 — Order History

## Commit Status

Not requested — no commit will be made unless the user asks.

## Outcome

Render the order-history section shown in the reference, with owned order rows, status, date/item summary, total, and a details action.

## Dependencies

Depends on Slice 01. Requires an explicit decision about the order data source because no order model or migration currently exists.

## Files / Areas

- Profile controller/query boundary and any approved order model/resource or fixture contract.
- Profile order-history components.
- `tests/Feature/Auth/` or the established profile feature-test location.
- Wayfinder route/action for order details only if an order-details route is approved.

## Intended Behavior

- Match the reference row structure without coupling the page to database internals.
- Scope orders to the authenticated user and never expose another user’s order data.
- Support a clear empty state when the user has no orders.
- Keep “View All Orders” and “Details” inactive or route-backed only when the corresponding behavior exists; do not create speculative endpoints.

## Verification

- Test populated and empty order states.
- Test user ownership isolation.
- Test status/total/date formatting at the response boundary.
- Verify the list remains readable on narrow screens.
