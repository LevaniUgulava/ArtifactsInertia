import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/useLocale';
import { ProductGrid } from '@/Pages/Home/Components/ProductGrid';
import { SectionTitle } from '@/Pages/Home/Components/SectionTitle';
import type { TrendingNowProps } from '@/Pages/Home/HomeTypes';
import { catalog } from '@/routes';

export function TrendingNow({ products }: TrendingNowProps) {
    const { t } = useTranslation('home');
    const lang = useLocale();

    return (
        <section className="bg-stone-100" id="trending">
            <div className="mx-auto max-w-[1920px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 2xl:px-16 2xl:py-28">
                <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
                    <SectionTitle eyebrow={t('trendingNow.eyebrow')} title={t('trendingNow.title')} />
                    <Link
                        className="text-xs font-semibold tracking-wide text-amber-700 underline-offset-4 hover:underline"
                        href={catalog.url({ lang }, { query: { sort: 'newest' } })}>
                        {t('seeMore', { ns: 'common' })} →
                    </Link>
                </div>
                <ProductGrid products={products} />
            </div>
        </section>
    );
}