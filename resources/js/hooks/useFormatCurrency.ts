import { gelFormatter } from '@/constants/format';

export function useFormatCurrency(): Intl.NumberFormat {
    return gelFormatter;
}