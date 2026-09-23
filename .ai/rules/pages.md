---
paths:
  - 'resources/js/Pages/**'
---

# Pages

## Feature folder = Types + hooks/ + Components/
Feature-folder pattern (matches Header): each feature keeps its Prismic types in a `<Feature>Types.ts` at the feature root, all custom hooks in a `hooks/` subfolder, and presentational/modal children in a `Components/` subfolder. Types local to the feature stay in the feature; types shared across features go to `resources/js/types/` (e.g. `shared.ts`). Hooks reusable app-wide go to `resources/js/hooks/` (e.g. `useLocale`, `useFormatCurrency`); otherwise they stay feature-local in `hooks/`. Keep TSX purely presentational: move state/handlers/router calls into the hooks.

## Feature types/constants live in subfolders
Supersedes .ai/rules/pages.md's `<Feature>Types.ts` at feature-root convention. Each feature keeps types in `<Feature>/types/<Feature>Types.ts` (page props, data shapes, and ALL component `*Props` types extracted) and feature-local constants in `<Feature>/constants/<file>.ts`. Existing `<Feature>Types.ts` at feature root and inline props/types inside components are legacy — migrate them. Per-feature derived arrays that need no props (e.g. ProfileSidebar navigationItems) may stay inline.
