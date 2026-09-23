import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import ProfileLayout from '@/Layouts/ProfileLayout';
import { CatalogProductGrid } from '@/Pages/Catalog/Components/CatalogProductGrid';
import type { FavoritesPageProps } from '@/Pages/Profile/types/ProfileTypes';

function Favorites({ favorites }: FavoritesPageProps) {
    const { t } = useTranslation('profile');

    return (
        <>
            <Head title={brandTitle(t('favorites'))} />
            <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <header className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl">{t('favorites')}</h1>
                    <p className="text-xs text-stone-500">{t('savedItemsEmpty')}</p>
                </header>

                <div className="mt-8">
                    {favorites.length > 0 ? <CatalogProductGrid products={favorites} /> : <div className="border border-dashed border-stone-300 py-20 text-center text-sm text-stone-500">{t('favoritesEmpty')}</div>}
                </div>
            </div>
        </>
    );
}

Favorites.layout = ProfileLayout;

export default Favorites;