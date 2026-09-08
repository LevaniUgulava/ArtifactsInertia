# Layout

## What

Responsive home-page layout for "Atelier Street" fashion storefront using Inertia React and Tailwind CSS.

## How

**Files:**
- `resources/js/Pages/Home.tsx` — Composes Header, StorefrontContent, Footer
- `resources/js/Components/Storefront/Header.tsx` — Brand logo, nav links, search/bag/menu buttons
- `resources/js/Components/Storefront/StorefrontContent.tsx` — Hero banner, new arrivals grid, collection banners, trending products
- `resources/js/Components/Storefront/Footer.tsx` — Three benefit columns on dark background

**Structure:**
- Mobile-first responsive with `sm`, `md`, `lg`, `2xl` breakpoints
- 1920px max-width container for ultra-wide screens
- Static dummy data with Unsplash placeholders
- Fragment links for scroll navigation (`#new-arrivals`, `#women`, `#men`)
- Semantic HTML with ARIA labels

**Components:**
- `ProductGrid` — Reusable 2-col mobile / 4-col desktop grid
- `SectionTitle` — Eyebrow + heading pattern
