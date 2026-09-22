import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/Components/Brand/Brand';
import RootLayout from '@/Layouts/RootLayout';
import { catalog as catalogRoute } from '@/routes';
import { CatalogFilters } from './Components/CatalogFilters';
import { CatalogPagination } from './Components/CatalogPagination';
import { CatalogProductGrid } from './Components/CatalogProductGrid';
import { CollectionHeader } from './Components/CollectionHeader';
import { EditorialBanner } from './Components/EditorialBanner';
import { FeaturedCollection } from './Components/FeaturedCollection';
import type { CatalogQueryState, FilterOption, FilterState, ColorOption, CatalogProduct } from './Components/CatalogTypes';

type CatalogPageProps = {
    catalog: {
        collection: {
            name: string;
            count: number;
            image: string;
        };
        filters: { categories: FilterOption[]; sizes: string[]; colors: ColorOption[]; collections: string[] };
        activeFilters: FilterState;
        sort: string;
        search: string;
        products: CatalogProduct[];
        pagination: { currentPage: number; lastPage: number; perPage: number; total: number };
    };
};

function Catalog({ catalog }: CatalogPageProps) {
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';
    const { t } = useTranslation('catalog');
    const [filters, setFilters] = useState<FilterState>(catalog.activeFilters);
    const [search, setSearch] = useState(catalog.search);
    const collectionName = catalog.collection.name || t('all');

    const navigate = (state: Partial<CatalogQueryState>) => {
        const query = {
            category: state.categories ?? filters.categories,
            size: state.sizes ?? filters.sizes,
            color: state.colors ?? filters.colors,
            collection: state.collections ?? filters.collections,
            minPrice: state.minPrice ?? filters.minPrice,
            maxPrice: state.maxPrice ?? filters.maxPrice,
            sort: state.sort ?? catalog.sort,
            q: state.search ?? search,
            page: state.page ?? 1,
        };

        router.get(catalogRoute.url({ lang }, { query }), {}, { preserveScroll: true, preserveState: true });
    };

    const clearFilters = () => {
        const cleared = { categories: [], sizes: [], colors: [], collections: [], minPrice: 50, maxPrice: 2500 };
        setFilters(cleared);
        navigate({ ...cleared, page: 1 });
    };

    const clearSearch = () => {
        setSearch('');
        navigate({ search: '', page: 1 });
    };

    return (
        <>
            <Head title={brandTitle(collectionName)} />
            <main className="mx-auto max-w-[1920px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 2xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] xl:grid-cols-[12rem_minmax(0,1fr)] 2xl:grid-cols-[14rem_minmax(0,1fr)]">
                    <CatalogFilters filters={catalog.filters} onApply={() => navigate({ page: 1 })} onChange={setFilters} onClear={clearFilters} value={filters} />
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
                        <FeaturedCollection featured={{ image: catalog.collection.image }} />
                        <CatalogProductGrid products={catalog.products} />
                        <EditorialBanner editorial={{ image: catalog.collection.image }} />
                        <CatalogPagination currentPage={catalog.pagination.currentPage} lastPage={catalog.pagination.lastPage} onNavigate={(page) => navigate({ page })} />
                    </div>
                </div>
            </main>
        </>
    );
}

Catalog.layout = RootLayout;

export default Catalog;
