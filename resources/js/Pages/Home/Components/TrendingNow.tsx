import { useTranslation } from 'react-i18next';
import { ProductGrid, type Product } from '@/Pages/Home/Components/ProductGrid';
import { SectionTitle } from '@/Pages/Home/Components/SectionTitle';

const trendingProducts: Product[] = [
    {
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85',
        name: 'Cashmere Blend Hoodie',
        price: '$205',
    },
    {
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=85',
        name: 'Tailored Track Pant',
        price: '$165',
    },
    {
        image: 'https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=700&q=85',
        name: 'Brushed Wool Scarf',
        price: '$145',
    },
];

export function TrendingNow() {
    const { t } = useTranslation('home');

    return (
        <section className="bg-stone-100" id="trending">
            <div className="mx-auto max-w-[1920px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 2xl:px-16 2xl:py-28">
                <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
                    <SectionTitle eyebrow={t('trendingNow.eyebrow')} title={t('trendingNow.title')} />
                    <span className="text-xs font-semibold tracking-wide text-amber-700">{t('seeMore', { ns: 'common' })} →</span>
                </div>
                <div className="mx-auto max-w-6xl">
                    <ProductGrid products={trendingProducts} />
                </div>
            </div>
        </section>
    );
}