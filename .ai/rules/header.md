---
paths:
  - 'resources/js/Layouts/Header/**'
---

# Header

## Hide cart link for guests in header
The cart route (/cart) is behind auth:sanctum, so the header bag icon renders only when a user is authenticated ({user ? ...}). Guests see the Sign In link instead. Never show a cart link to unauthenticated visitors. Always pass { lang } to Wayfinder route helpers (header, ProfileSidebar, breadcrumbs) so locale is preserved.

## Cart badge count keeps a client-side store in sync
The cart badge (CartBadge.tsx) reads the count from the shared `cartCount` prop, synced into a module store via useCartCount (resources/js/hooks/useCartCount.ts). useHttp POSTs do NOT refresh Inertia props, so after add/remove you must call incrementCartCount()/decrementCartCount() (already wired in useAddToCart and useCartItems). Bounce uses the `animate-cart-bounce` keyframes defined in @theme in resources/css/app.css; CartBadge remounts via key to replay it on increase.

## Cart badge: shared cartCount prop + router.reload({only:['cartCount']})
The cart badge (CartBadge.tsx) reads the shared `cartCount` prop directly via usePage — there is NO client store. After any cart mutation that uses useHttp (add via useAddToCart; quantity change / remove / save-for-later via useCartItems), call router.reload({ only: ['cartCount'] }) in onSuccess so the server re-shares just the count. Bounce = local previous-count ref + key remount replaying `animate-cart-bounce` (keyframes in @theme in resources/css/app.css). Do not reintroduce a listener/pub-sub store.
