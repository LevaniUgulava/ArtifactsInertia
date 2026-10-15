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

## MANDATORY: every constant lives in a dedicated file under resources/js/constants/
Every module-level `const` (values, lookup maps, icon maps, bounds, keys, defaults) must live in a dedicated file in `resources/js/constants/[feature].ts` and be imported everywhere it is used. Never declare a module-level constant inline in a component, hook, or page, and do not create local `constants/` folders.
- One file per concern/feature, named in lower camelCase (e.g. `brand.ts`, `format.ts`, `promo.ts`, `images.ts`, `filters.ts`, `deliveryIcons.ts`, `statKeys.ts`, `productForm.ts`).
- Never inline brand strings, currency formatters, promo codes, unsplash URLs, icon maps, price bounds, or default objects in components/hooks; move them to `@/constants/*`.
- Global types live in resources/js/types/ (see the type-file rule below). Use `gelFormatter` from @/constants/format for ₾ money formatting (GEL + narrowSymbol; narrowSymbol is cast for older TS lib). useFormatCurrency still wraps gelFormatter. This supersedes the hooks.md "useFormatCurrency idiom" for new code.

## Use cn for conditional class composition
Use the shared `cn` utility from `@/lib/utils` when class names need conditional or optional composition. Keep JSX readable and avoid long template-string class expressions.

## Import with absolute @/ paths, never relative
All hand-written TS/TSX must import via the `@/` alias (maps to `resources/js`) instead of `./` or `../`. Exception: auto-generated Wayfinder files under `resources/js/routes/**`, `resources/js/actions/**` and `resources/js/wayfinder/**` keep relative imports and must not be hand-edited.

## MANDATORY: keep .tsx files clean — logic lives in custom hooks
Every `.tsx` file must be template only: destructure from hooks and render JSX. It is mandatory that state, effects, refs, forms (`useForm`), HTTP/Echo subscriptions, derived values, router calls, and event handlers live in a co-located custom hook, never inline in the component body.
- Hook files go in the feature's local `hooks/` folder, next to the component (e.g. `Pages/Admin/Chat/hooks/useAdminChat.ts`, `Pages/Cart/hooks/useCartSummary.ts`, `Layouts/Admin/AdminSidebar/hooks/useAdminSidebar.ts`).
- Name hooks `use[Functional]` where `[Functional]` names the behavior in PascalCase (e.g. `useProductForm`, `useCollectionHeader`, `useMessageComposer`).
- A `.tsx` file must not contain `useState`/`useEffect`/`useRef`/`useMemo`/`useCallback`/`useForm`/`useHttp`/`useEcho` or `function handleX()`. The only allowed hooks in `.tsx` are presentational/read-only ones that return translated strings or plain values, and passing data/`t` down.
- Acceptable exception: a headless connector component that must mount/unmount to control a subscription (e.g. `Components/ChatWrapper/Components/ChatLive.tsx` wrapping `useEcho`). Keep it to a single wiring line.

## MANDATORY: every type lives in a dedicated file named [Feature]Types.ts
Never declare a `type` or `interface` inline in a `.tsx`/`.ts` file. Move it to a dedicated types file and import it.
- Naming is always `[Feature]Types.ts` in PascalCase: `ProductTypes.ts`, `ChatTypes.ts`, `CheckoutTypes.ts`, `FooterTypes.ts`, `AdminTypes.ts`.
- Local (page/layout feature) types: place the file directly in the feature folder — do NOT create a `types/` subfolder (`Pages/Product/ProductTypes.ts`, `Pages/Admin/Chat/ChatTypes.ts`, `Layouts/Footer/FooterTypes.ts`).
- One types file per feature folder. A hook's types go in the feature's Types file, not inside the hook (e.g. `Pages/Admin/Components/hooks/useProductForm.ts` -> `Pages/Admin/Components/ProductFormTypes.ts`).
- Global types: `resources/js/types/[name].ts` — `app.ts` (Inertia app), `shared.ts` (SharedPageProps, auth, locale), `layouts.ts` (Layout props), `components.ts` (all `resources/js/Components/**` prop types).
- `resources/js/Components/**` prop types go in `resources/js/types/components.ts`, never inline and never in a local file. `Layouts/**` inline types go to a co-located `[Feature]Types.ts`.
- No inline anonymous `usePage<{ ... }>` shapes — reuse `SharedPageProps` from `@/types/shared`.
- Helper-component props (`Field`, `SafeImage`, `SocialIcon`, ...) are real types too: declare them in the feature Types file, do not annotate them inline.
