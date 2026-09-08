import { Head } from '@inertiajs/react';
import RootLayout from '@/Layouts/RootLayout';
import { CollectionBanners } from '@/Pages/Home/Components/CollectionBanners';
import { Hero } from '@/Pages/Home/Components/Hero';
import { NewArrivals } from '@/Pages/Home/Components/NewArrivals';
import { TrendingNow } from '@/Pages/Home/Components/TrendingNow';

function Home() {
    return (
        <>
            <Head title="Atelier Street" />

            <main id="top">
                <Hero />
                <NewArrivals />
                <CollectionBanners />
                <TrendingNow />
            </main>
        </>
    );
}

Home.layout = RootLayout;

export default Home;
