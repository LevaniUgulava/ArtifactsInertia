import { useTranslation } from 'react-i18next';
import { ProductGrid, type Product } from '@/Pages/Home/Components/ProductGrid';
import { SectionTitle } from '@/Pages/Home/Components/SectionTitle';

const newArrivals: Product[] = [
    {
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85',
        name: 'Wool Blend Bomber',
        price: '$240',
    },
    {
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=85',
        name: 'Relaxed Cargo Trouser',
        price: '$190',
    },
    {
        image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=85',
        name: 'Structured Poplin Shirt',
        price: '$175',
    },
    {
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85',
        name: 'Leather Platform Boot',
        price: '$320',
    },
];

export function NewArrivals() {
    const { t } = useTranslation('home');

    return (
        <section className="mx-auto max-w-[1920px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 2xl:px-16 2xl:py-28" id="new-arrivals">
            <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
                <SectionTitle eyebrow={t('newArrivals.eyebrow')} title={t('newArrivals.title')} />
                <a className="text-xs font-semibold tracking-wide text-amber-700 underline-offset-4 hover:underline" href="#trending">
                    {t('viewAll', { ns: 'common' })} →
                </a>
            </div>
            <ProductGrid products={newArrivals} />
        </section>
    );
}