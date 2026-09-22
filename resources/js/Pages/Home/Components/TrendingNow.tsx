import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { catalog } from '@/routes';
import { ProductGrid, type Product } from '@/Pages/Home/Components/ProductGrid';
import { SectionTitle } from '@/Pages/Home/Components/SectionTitle';

export function TrendingNow({ products }: { products: Product[] }) {
    const { t } = useTranslation('home');
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';

    return (
        <section className="bg-stone-100" id="trending">
            <div className="mx-auto max-w-[1920px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 2xl:px-16 2xl:py-28">
                <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
                    <SectionTitle eyebrow={t('trendingNow.eyebrow')} title={t('trendingNow.title')} />
                    <Link className="text-xs font-semibold tracking-wide text-amber-700 underline-offset-4 hover:underline" href={catalog.url({ lang }, { query: { sort: 'newest' } })}>
                        {t('seeMore', { ns: 'common' })} →
                    </Link>
                </div>
                <div className="mx-auto max-w-6xl">
                    <ProductGrid products={products} />
                </div>
            </div>
        </section>
    );
}