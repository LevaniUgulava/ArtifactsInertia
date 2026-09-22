import { Head } from '@inertiajs/react';
import { brandTitle } from '@/Components/Brand/Brand';
import RootLayout from '@/Layouts/RootLayout';
import { CollectionBanners } from '@/Pages/Home/Components/CollectionBanners';
import { Hero } from '@/Pages/Home/Components/Hero';
import { NewArrivals } from '@/Pages/Home/Components/NewArrivals';
import type { Product } from '@/Pages/Home/Components/ProductGrid';
import { TrendingNow } from '@/Pages/Home/Components/TrendingNow';

type HomePageProps = {
    newArrivals: Product[];
    trendingProducts: Product[];
    collections: { name: string; slug: string; image: string }[];
};

function Home({ newArrivals, trendingProducts, collections }: HomePageProps) {
    return (
        <>
            <Head title={brandTitle()} />

            <main id="top">
                <Hero />
                <NewArrivals products={newArrivals} />
                <CollectionBanners collections={collections} />
                <TrendingNow products={trendingProducts} />
            </main>
        </>
    );
}

Home.layout = RootLayout;

export default Home;
