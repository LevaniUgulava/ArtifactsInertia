---
paths:
  - resources/js/app.tsx
  - 'resources/js/**'
---

# Js

## Inertia v3 setup must mount the React root itself
Inertia v3 @inertiajs/react: when you pass a manual `setup` to createInertiaApp, the adapter does NOT mount for you — the setup callback itself MUST call createRoot(el).render(...) (or hydrateRoot(el, ...) when el has data-server-rendered). The old v1/v2 pattern of just returning <App .../> silently never mounts: page looks fine (SSR HTML) but zero interactivity, and with SSR off it's a blank page. Current app.tsx mounts I18nextProvider-wrapped App in setup. If you rewrite app.tsx, keep this.

## Prices are Georgian Lari (₾) everywhere — use narrowSymbol
Currency is Georgian Lari only. frontend Intl money formatters must use { style: 'currency', currency: 'GEL', currencyDisplay: 'narrowSymbol' } — without narrowSymbol, en-US renders 'GEL 485.00' instead of '₾485.00'. Never hardcode $, EUR, or €. Backend resources/API-derived price strings prefix the amount with '₾'.
