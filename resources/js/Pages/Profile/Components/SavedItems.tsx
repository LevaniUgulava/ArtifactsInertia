import { ArrowRightIcon, ShoppingBagIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/Pages/Profile/Components/SectionHeading';

export type SavedItem = {
    name: string;
    price: string;
    image: string;
};

export function SavedItems({ items }: { items: SavedItem[] }) {
    const { t } = useTranslation('profile');

    return (
        <section>
            <SectionHeading
                action={<button className="inline-flex items-center gap-1 text-[11px] font-medium text-[#b38145] transition hover:text-stone-950" type="button">{t('browseMore')} <ArrowRightIcon aria-hidden="true" size={12} /></button>}
                title={t('savedItems')}
            />

            {items.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    {items.map((item) => (
                        <article className="overflow-hidden rounded-lg border border-stone-200 bg-white" key={item.name}>
                            <img alt={item.name} className="aspect-square w-full object-cover" src={item.image} />
                            <div className="space-y-2 p-3">
                                <div>
                                    <h3 className="truncate text-[11px] font-semibold text-stone-900">{item.name}</h3>
                                    <p className="mt-1 text-[10px] text-stone-500">{item.price}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="rounded border border-[#d7b37d] px-2 py-2 text-[9px] font-medium text-[#b38145] transition hover:bg-[#fbf5ec]" type="button">{t('view')}</button>
                                    <button aria-label={t('addToCart', { name: item.name })} className="grid place-items-center rounded bg-[#bb915b] px-2 py-2 text-white transition hover:bg-[#a77e4c]" type="button"><ShoppingBagIcon aria-hidden="true" size={12} /></button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="rounded-lg border border-dashed border-stone-200 px-5 py-8 text-center text-sm text-stone-500">{t('savedItemsEmpty')}</p>
            )}
        </section>
    );
}
