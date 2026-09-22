---
paths:
  - 'resources/js/Pages/**'
---

# Pages

## Feature folder = Types + hooks/ + Components/
Feature-folder pattern (matches Header): each feature keeps its Prismic types in a `<Feature>Types.ts` at the feature root, all custom hooks in a `hooks/` subfolder, and presentational/modal children in a `Components/` subfolder. Types local to the feature stay in the feature; types shared across features go to `resources/js/types/` (e.g. `shared.ts`). Hooks reusable app-wide go to `resources/js/hooks/` (e.g. `useLocale`, `useFormatCurrency`); otherwise they stay feature-local in `hooks/`. Keep TSX purely presentational: move state/handlers/router calls into the hooks.
