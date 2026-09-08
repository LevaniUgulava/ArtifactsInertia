import { useTranslation } from 'react-i18next';
import type { Recommendation } from './ProductTypes';

export function CompleteTheLook({ recommendations }: { recommendations: Recommendation[] }) {
    const { t } = useTranslation('product');

    return (
        <section className="space-y-5 border-t border-stone-200 pt-8">
            <h2 className="text-lg font-semibold text-stone-950">{t('completeTheLook')}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
                {recommendations.map((item) => (
                    <article className="min-w-0" key={item.slug}>
                        <img alt={item.name} className="aspect-[4/5] w-full object-cover" loading="lazy" src={item.image} />
                        <h3 className="mt-2 truncate text-xs font-semibold text-stone-950">{item.name}</h3>
                        <p className="mt-1 text-xs text-stone-500">{item.price}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
