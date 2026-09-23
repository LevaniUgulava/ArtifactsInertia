import { useTranslation } from 'react-i18next';
import { paymentIcons } from '../constants/paymentIcons';
import type { PaymentDetailsProps } from '../types/CheckoutTypes';

export function PaymentDetails({ methods, onChange, selected }: PaymentDetailsProps) {
    const { t } = useTranslation('checkout');

    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-bold text-stone-950 sm:text-base">{t('paymentDetails')}</h2>
                <span className="text-[10px] text-stone-400">{t('securePayment')}</span>
            </div>

            <div aria-label={t('paymentDetails')} className="mt-5 flex flex-wrap gap-2" role="radiogroup">
                {methods.map((method) => {
                    const Icon = paymentIcons[method.id as keyof typeof paymentIcons];
                    const isSelected = selected === method.id;

                    return (
                        <button aria-checked={isSelected} className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[10px] font-semibold transition ${isSelected ? 'border-[#b38145] bg-[#fffaf2] text-stone-800' : 'border-stone-200 text-stone-500 hover:border-stone-300'}`} key={method.id} role="radio" type="button" onClick={() => onChange(method.id)}>
                            <Icon aria-hidden="true" size={13} strokeWidth={1.8} />
                            {t(method.id)}
                        </button>
                    );
                })}
            </div>

            {selected === 'card' && (
                <p className="mt-4 rounded-md bg-[#f8f5f0] px-3 py-2.5 text-[10px] leading-4 text-stone-500">{t('cardRedirectNotice')}</p>
            )}
        </section>
    );
}