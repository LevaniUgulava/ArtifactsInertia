---
paths:
  - app/Http/Controllers/CartController.php
  - 'app/Http/Controllers/**'
  - app/Http/Controllers/FavoritesController.php
---

# Controllers

## Eager load cart item relations in CartController::show
Always load $user->cart()->with(['items.variant.product', 'items.variant.media', 'promoCode']) to avoid N+1 on items.variant.product->name and image. Serialize with ItemsResource::collection(...)->resolve($request) so cart.items stays a plain array.

## Add-to-cart resolves variant by slug → color+size
Add-to-cart: frontend posts slug+color+size; server finds the Product by slug, then the Variant by (color,size) — variants are unique per product by that pair. Increment existing cart item instead of duplicating (unique cart_id+variant_id). Enforce stock, snapshot variant price on first add, keep it for later increments. Return JSON (not Inertia) — frontend uses useHttp.

## Use Form Requests, never inline validation in controllers
Never call `$request->validate()` or throw ValidationException inline in a controller action. Put field validation in a Form Request, one per action, in a per-feature folder: `app/Http/Requests/<Feature>/<Feature><Action>Request.php` (e.g. `Cart/CartStoreRequest`, `Cart/CartUpdateQuantityRequest`), then type-hint it on the action. Keep business/stock checks (non-field logic) in the controller or a service. Resources follow the same per-feature layout in `app/Http/Resources/<Feature>/` (e.g. `Cart/CartResource`, `Cart/ItemsResource`).

## Checkout totals recomputed server-side from cart + delivery + promo
CheckoutController::show always mirrors the user's real cart (ItemsResource) with customer prefilled from User::name/email. placeOrder NEVER trusts client totals: it recomputes subtotal (item price x qty), shipping from the chosen delivery_types.price, discount from the active promo_codes row (type 'fixed' = flat value, 'percent' = % of subtotal), then persists an Order with status pending. No VAT/tax anywhere — total = subtotal + shipping - discount. Cart has no address columns; shipping address lives only on the Order.

## Favorites pivot + slug-keyed routes + cart save merges into it
Favorites are a user-product pivot table (User::favorites() / Product::favoritedBy(), withTimestamps). Routes are slug-keyed: GET {lang}/favorites, POST|DELETE {lang}/favorites/{product}. Store uses syncWithoutDetaching (idempotent); destroy uses detach; both return JSON {favorited: bool}. Cart "save for later" (CartController::saveForLater, route cart.items.save) deletes the cart item AND favorites its variant's product inside one DB::transaction. The list reuses CatalogProductResource + CatalogProductGrid ordered by pivot created_at desc.
