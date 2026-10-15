import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import RootLayout from '@/Layouts/RootLayout';
import { CatalogFilters } from '@/Pages/Catalog/Components/CatalogFilters';
import { CatalogPagination } from '@/Pages/Catalog/Components/CatalogPagination';
import { CatalogProductGrid } from '@/Pages/Catalog/Components/CatalogProductGrid';
import { CollectionHeader } from '@/Pages/Catalog/Components/CollectionHeader';
import type { CatalogPageProps } from '@/Pages/Catalog/CatalogTypes';
import { useCatalog } from '@/Pages/Catalog/hooks/useCatalog';

function Catalog({ catalog }: CatalogPageProps) {
    const { t } = useTranslation('catalog');
    const { filters, search, navigate, applyFilters, clearFilters, clearSearch } = useCatalog(catalog);
    const collectionName = catalog.collection.name || t('all');

    return (
        <>
            <Head title={brandTitle(collectionName)} />
            <main className="mx-auto max-w-[1920px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 2xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] xl:grid-cols-[12rem_minmax(0,1fr)] 2xl:grid-cols-[14rem_minmax(0,1fr)]">
                    <CatalogFilters filters={catalog.filters} onChange={applyFilters} onClear={clearFilters} value={filters} />
                    <div className="min-w-0 space-y-8">
                        <CollectionHeader count={catalog.collection.count} name={collectionName} onSortChange={(sort) => navigate({ sort, page: 1 })} sort={catalog.sort} />
                        {search ? (
                            <p className="flex flex-wrap items-center gap-3 border-b border-stone-200 pb-5 text-xs text-stone-600">
                                <span>{t('searchResults', { query: search })}</span>
                                <button className="font-semibold text-amber-700 underline-offset-4 hover:underline" onClick={clearSearch} type="button">
                                    {t('clearSearch')}
                                </button>
                            </p>
                        ) : null}
                        <CatalogProductGrid products={catalog.products} />
                        <CatalogPagination currentPage={catalog.pagination.currentPage} lastPage={catalog.pagination.lastPage} onNavigate={(page) => navigate({ page })} />
                    </div>
                </div>
            </main>
        </>
    );
}

Catalog.layout = RootLayout;

export default Catalog;