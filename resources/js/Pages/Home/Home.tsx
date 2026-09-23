import { Head } from '@inertiajs/react';
import { brandTitle } from '@/constants/brand';
import RootLayout from '@/Layouts/RootLayout';
import { CollectionBanners } from '@/Pages/Home/Components/CollectionBanners';
import { Hero } from '@/Pages/Home/Components/Hero';
import { NewArrivals } from '@/Pages/Home/Components/NewArrivals';
import { TrendingNow } from '@/Pages/Home/Components/TrendingNow';
import type { HomePageProps } from '@/Pages/Home/types/HomeTypes';

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