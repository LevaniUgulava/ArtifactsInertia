---
paths:
  - 'app/Http/Requests/**'
---

# Requests

## Georgian-aware international phone validation
Checkout phone is validated via an inline Closure rule in PlaceOrderRequest (no package): phone must be international E.164 format (/^\+[1-9]\d{7,14}$/ after stripping spaces/dashes/parens); if it starts with +995 it must be a valid Georgian number (/^\+995[3-9]\d{8}$/). Custom messages use lang/en|ka/validation.php keys phone_format and phone_georgia. Frontend phone input is type=tel with placeholder +995 555 12 34 56.

## Fixed +995 Georgian phone validation
Checkout phone is Georgia-only: the +995 prefix is FIXED. Validated via an inline Closure rule in PlaceOrderRequest (no package) requiring /^\+995[3-9]\d{8}$/ (after stripping spaces/dashes/parens). Frontend renders a locked "+995" chip next to the tel input; only the 9 digits are editable and the stored form value is always '+995'.digit. Message key: validation.phone_georgia.
