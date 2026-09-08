import { LockKeyholeIcon, TagIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CheckoutItem } from '@/Pages/Checkout/Checkout';

type CheckoutOrderSummaryProps = {
    discount: number;
    items: CheckoutItem[];
    onApplyPromo: () => void;
    onPromoCodeChange: (value: string) => void;
    promoApplied: boolean;
    promoCode: string;
    shipping: number;
    subtotal: number;
    tax: number;
    total: number;
    terms: boolean;
    onTermsChange: (value: boolean) => void;
    processing: boolean;
};

const currency = new Intl.NumberFormat('en-US', { currency: 'EUR', style: 'currency' });

export function CheckoutOrderSummary({ discount, items, onApplyPromo, onPromoCodeChange, onTermsChange, promoApplied, promoCode, processing, shipping, subtotal, tax, terms, total }: CheckoutOrderSummaryProps) {
    const { t } = useTranslation('checkout');

    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <h2 className="text-sm font-bold text-stone-950 sm:text-base">{t('orderSummary')}</h2>

            <div className="mt-5 divide-y divide-stone-100">
                {items.map((item) => (
                    <div className="flex gap-3 py-3 first:pt-0 last:pb-0" key={item.id}>
                        <img alt={item.name} className="size-14 rounded-md object-cover" src={item.image} />
                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[11px] font-semibold text-stone-900">{item.name}</h3>
                            <p className="mt-1 text-[10px] text-stone-400">{item.variant}</p>
                            <p className="mt-1 text-[10px] text-stone-500">{t('qtyLabel', { count: item.quantity })}</p>
                        </div>
                        <p className="text-[11px] font-semibold text-stone-700">{currency.format(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>

            <dl className="mt-5 space-y-3 border-t border-stone-100 pt-5 text-xs">
                <div className="flex justify-between gap-4 text-stone-500"><dt>{t('subtotal')}</dt><dd className="font-semibold text-stone-700">{currency.format(subtotal)}</dd></div>
                <div className="flex justify-between gap-4 text-stone-500"><dt>{t('expressDelivery')}</dt><dd className="font-semibold text-stone-700">{shipping > 0 ? currency.format(shipping) : t('free')}</dd></div>
                <div className="flex justify-between gap-4 text-stone-500"><dt>{t('taxLine')}</dt><dd className="font-semibold text-stone-700">{currency.format(tax)}</dd></div>
                {discount > 0 && <div className="flex justify-between gap-4 text-emerald-600"><dt>{t('promoDiscount')}</dt><dd className="font-semibold">-{currency.format(discount)}</dd></div>}
            </dl>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-stone-100 pt-5">
                <span className="text-sm font-bold text-stone-950">{t('total')}</span>
                <span className="text-base font-bold text-stone-950">{currency.format(total)}</span>
            </div>

            <div className="mt-5 flex gap-2">
                <div className="relative min-w-0 flex-1">
                    <TagIcon aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b38145]" size={13} />
                    <input className="min-h-10 w-full rounded-md border border-stone-200 bg-[#faf8f4] pl-9 pr-3 text-xs outline-none placeholder:text-stone-400 focus:border-[#bb915b]" placeholder={t('promoPlaceholder')} type="text" value={promoCode} onChange={(event) => onPromoCodeChange(event.target.value)} />
                </div>
                <button className="text-[10px] font-semibold text-[#b38145] transition hover:text-stone-950" type="button" onClick={onApplyPromo}>{t('apply')}</button>
            </div>
            {promoApplied && <p className="mt-2 text-[10px] text-emerald-600">{t('promoApplied')}</p>}

            <label className="mt-5 flex items-start gap-2 text-[10px] leading-4 text-stone-500">
                <input className="mt-0.5 accent-[#b38145]" type="checkbox" checked={terms} onChange={(event) => onTermsChange(event.target.checked)} />
                <span>{t('termsText')}</span>
            </label>
            <button className="mt-5 flex w-full items-center justify-center rounded-md bg-[#b88b52] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[#a77e4c] disabled:cursor-not-allowed disabled:opacity-60" disabled={!terms || processing} type="submit">
                {processing ? t('validating') : t('placeOrder')}
            </button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-stone-400"><LockKeyholeIcon aria-hidden="true" size={12} /> {t('sslEncryption')}</p>
        </section>
    );
}
