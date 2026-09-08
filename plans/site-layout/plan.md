# Site Layout Plan

## Commit Status

Not requested

## What Was Built

A responsive home-page layout for a fashion storefront called "Atelier Street" using Inertia React with Tailwind CSS.

## How It Was Built

**Architecture:**
- `resources/js/Pages/Home.tsx` — Main page component composing Header, StorefrontContent, and Footer
- `resources/js/Components/Storefront/Header.tsx` — Brand, navigation, and utility controls
- `resources/js/Components/Storefront/StorefrontContent.tsx` — Hero, product grids, and collection banners
- `resources/js/Components/Storefront/Footer.tsx` — Benefit statements in dark footer

**Approach:**
- Mobile-first responsive design with breakpoints at `sm`, `md`, `lg`, and `2xl`
- Container capped at 1920px max-width for ultra-wide viewports
- Static dummy data with Unsplash placeholder imagery
- Frontend-only interactions using fragment links (`#new-arrivals`, `#women`, `#men`)
- Semantic HTML with ARIA labels for accessibility

## Why This Approach

- **Inertia React:** Matches the project stack; enables SPA behavior without API overhead
- **Tailwind CSS:** Utility-first approach for rapid responsive development
- **Component isolation:** Each section (Header, Content, Footer) is independently maintainable
- **Static data first:** Allows layout validation before backend integration
- **Fragment links:** Enables scroll navigation without route complexity during initial build

## Decisions Made

- Use static dummy copy and remote placeholder imagery until final assets are supplied
- Keep interactions frontend-only without routes, APIs, or server state
- Components are page-specific until more pages are confirmed
- Support mobile, laptop, and wide desktop layouts (1920px cap)

## Slices

1. [01-header.md](slices/01-header.md) — Header structure, navigation, and responsive controls
2. [02-main-content.md](slices/02-main-content.md) — Home-page content hierarchy and responsive sections
3. [03-footer.md](slices/03-footer.md) — Footer content and responsive arrangement

## Verification

- TypeScript type-checking passes
- Vite production build succeeds
- Layout renders correctly at mobile, laptop, and wide desktop widths
- Keyboard navigation works for interactive elements
