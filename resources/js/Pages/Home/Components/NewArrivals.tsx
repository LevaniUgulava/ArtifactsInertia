import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { catalog } from '@/routes';
import { ProductGrid } from '@/Pages/Home/Components/ProductGrid';
import { SectionTitle } from '@/Pages/Home/Components/SectionTitle';
import type { NewArrivalsProps } from '../types/HomeTypes';

export function NewArrivals({ products }: NewArrivalsProps) {
    const { t } = useTranslation('home');
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';

    return (
        <section className="mx-auto max-w-[1920px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 2xl:px-16 2xl:py-28" id="new-arrivals">
            <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
                <SectionTitle eyebrow={t('newArrivals.eyebrow')} title={t('newArrivals.title')} />
                <Link className="text-xs font-semibold tracking-wide text-amber-700 underline-offset-4 hover:underline" href={catalog.url({ lang }, { query: { sort: 'newest' } })}>
                    {t('viewAll', { ns: 'common' })} →
                </Link>
            </div>
            <ProductGrid products={products} />
        </section>
    );
}