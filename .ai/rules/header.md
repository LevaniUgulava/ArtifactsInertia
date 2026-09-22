---
paths:
  - 'resources/js/Layouts/Header/**'
---

# Header

## Hide cart link for guests in header
The cart route (/cart) is behind auth:sanctum, so the header bag icon renders only when a user is authenticated ({user ? ...}). Guests see the Sign In link instead. Never show a cart link to unauthenticated visitors. Always pass { lang } to Wayfinder route helpers (header, ProfileSidebar, breadcrumbs) so locale is preserved.
