---
paths:
  - 'resources/js/hooks/**'
---

# Hooks

## Global hooks folder + locale/currency idioms
App-wide reusable hooks live in resources/js/hooks/ (useLocale, useFormatCurrency). The Pattern idiom: replace `const lang = (props.locale as string) ?? 'en'` with useLocale(), and replace inline `new Intl.NumberFormat('en-US',{style:'currency',currency:'GEL',currencyDisplay:'narrowSymbol'})` with useFormatCurrency(). Keep GEL + narrowSymbol — do not switch currency codes.
