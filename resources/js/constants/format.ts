export const gelFormatter = new Intl.NumberFormat('en-US', {
    currency: 'GEL',
    currencyDisplay: 'narrowSymbol' as Intl.NumberFormatOptions['currencyDisplay'],
    style: 'currency',
});