const formatter = new Intl.NumberFormat('en-US', {
    currency: 'GEL',
    currencyDisplay: 'narrowSymbol',
    style: 'currency',
});

export function useFormatCurrency(): Intl.NumberFormat {
    return formatter;
}