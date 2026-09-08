import { ShoppingBagIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { home } from '@/routes';

export function EmptyCart() {
    const { t } = useTranslation('cart');

    return (
        <section className="grid min-h-80 place-items-center rounded-xl border border-dashed border-stone-200 px-6 py-14 text-center">
            <div className="flex max-w-sm flex-col items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-[#f8f5f0] text-[#b38145]"><ShoppingBagIcon aria-hidden="true" size={23} strokeWidth={1.7} /></span>
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-stone-950">{t('empty')}</h2>
                    <p className="text-sm leading-6 text-stone-500">{t('emptyDescription')}</p>
                </div>
                <Link className="rounded-md bg-[#bb915b] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#a77e4c]" href={home.url()}>
                    {t('continueShopping')}
                </Link>
            </div>
        </section>
    );
}
