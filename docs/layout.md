# ARTIFACTS Storefront — High-Level Documentation

## What

ARTIFACTS is a bilingual (English / Georgian) fashion e-commerce storefront. It consists of:

- **Storefront pages** — Home, Catalog (with search, filters, sorting, pagination), Product, Cart, Checkout.
- **Auth & account** — Registration, login, email verification, and a profile area with order history, saved items, preferences, delivery addresses, and payment settings.
- **Admin panel** — Filament-based dashboard scaffolded for managing catalog data.

All customer-facing copy is localized ("ARTIFACTS" brand, `en` and `ka`), and all prices are shown in Georgian Lari (`₾`).

## How

**Stack:**

- **Backend:** Laravel 12 / PHP 8.4. Eloquent models, API Resources, controllers, and feature tests with Pest.
- **Frontend:** Inertia v3 + React 19, server-rendered via Inertia (SSR), mounted through `resources/js/app.tsx` (manual `setup` must call `createRoot`/`hydrateRoot`).
- **Styling:** Tailwind CSS v4 with CSS-first config in `resources/css/app.css` (brand tokens: `charcoal`, `olive`, `taupe`, `stone`; display serif via `--font-display`).
- **Routing:** Laravel routes (all storefront routes prefixed `/{lang}`) exposed to the frontend through Laravel Wayfinder typed helpers (`@/routes`, `@/actions`). Always pass `{ lang }` so the locale is preserved.
- **Localization:** `react-i18next` with JSON namespaces per page (`resources/js/locales/{en,ka}/*.json`), a `SetLocale` middleware, and locale-parameter persistence. `Head` page titles funnel through `brandTitle()`.
- **Media:** `spatie/laravel-medialibrary` on models (product variants, collections); DriftDB-backed catalog data seeded with `CatalogSeeder`.
- **Brand:** Centralized in `resources/js/Components/Brand/Brand.tsx` (name, tagline, mark, `brandTitle`, `BrandLockup`), with favicon assets under `public/branding/`.
- **Currency:** Georgian Lari everywhere. Frontend uses `{ currency: 'GEL', currencyDisplay: 'narrowSymbol' }`; backend price strings prefix `₾`.

**Key files / flows:**

- `routes/web.php` — redirects `/` → `/en`; `/{lang}`, `/{lang}/catalog`, `/{lang}/products/{product}`.
- `app/Http/Controllers/HomeController.php` — database-backed home: new arrivals, trending (badged) products, women's/men's collections.
- `app/Http/Controllers/CatalogController.php` — catalog with `q` search, `collection` slug, category/color/size/price filters, sort, pagination. Frontend refactored to the feature pattern: `CatalogTypes.ts` (at feature root) + `hooks/useCatalog.ts` (filters/search state, auto-apply navigation, clear) + `Components/` (filters, product grid/card, pagination, collection header). Filters auto-apply on toggle — no Apply button. Frontend refactored to the feature-folder pattern (`CatalogTypes.ts` + `hooks/useCatalog` + `Components/`); filters auto-apply on toggle (no Apply button).
- **Feature-folder pattern** (project-wide, see `.ai/rules/pages.md` & `hooks.md`): each storefront feature keeps `<Feature>Types.ts` at its root, custom hooks in `hooks/`, and presentational/modal children in `Components/`. Types shared app-wide go to `resources/js/types/` (e.g. `shared.ts`); reusable hooks go to `resources/js/hooks/` (`useLocale`, `useFormatCurrency`); otherwise they stay feature-local.
- `resources/js/Layouts/Header/Header.tsx` — sticky header: search (catalog `q`), guest language switcher, sign-in / bag / profile controls. Refactored to the feature-folder pattern: `HeaderTypes.ts` + `hooks/` (useHeader, useSearchModal) + `Components/` (SearchModal, MobileHeader).
- `resources/js/Layouts/{Root,Auth,Checkout,Profile}Layout.tsx` + `Footer/Footer.tsx` — shared surfaces using brand tokens.
- `docs/` per-area docs and `.ai/rules/` project rules govern conventions (see AGENTS.md).

## Why

- **Inertia + React** keeps a fast client-side SPA without a separate API layer; all navigation stays server-routed and Wayfinder-typed.
- **Locale-prefixed routes** make each language an addressable URL (`/en/...`, `/ka/...`) and avoid client-side language state hacks.
- **Georgian Lari** is the store's single currency, so formatters hardcode `GEL` + `narrowSymbol` instead of a currency switcher.
- **Database-backed home/catalog** replaced static dummy data so new products/collections flow from the seeded catalog rather than UI constants.
- **Shared brand module** (tokens + `Brand.tsx`) exists so "ARTIFACTS" identity changes in one place instead of being hardcoded across pages.
- **Hardened Inertia v3 setup** (explicit root mount) is documented in `.ai/rules/js.md` because the v1/v2 return-`<App/>` pattern silently never mounts in v3.