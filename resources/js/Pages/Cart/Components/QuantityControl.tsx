import { MinusIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type QuantityControlProps = {
    onChange: (quantity: number) => void;
    value: number;
};

export function QuantityControl({ onChange, value }: QuantityControlProps) {
    const { t } = useTranslation('cart');

    return (
        <div aria-label={t('quantity')} className="inline-flex items-center rounded-md border border-stone-200 text-xs text-stone-600">
            <button aria-label={t('decreaseQuantity')} className="grid size-8 place-items-center transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40" disabled={value <= 1} type="button" onClick={() => onChange(value - 1)}>
                <MinusIcon aria-hidden="true" size={12} />
            </button>
            <span aria-live="polite" className="grid min-w-8 place-items-center border-x border-stone-200 px-2">{value}</span>
            <button aria-label={t('increaseQuantity')} className="grid size-8 place-items-center transition hover:bg-stone-50" type="button" onClick={() => onChange(value + 1)}>
                <PlusIcon aria-hidden="true" size={12} />
            </button>
        </div>
    );
}
