import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
        products: CatalogProduct[];
        pagination: { currentPage: number; lastPage: number; perPage: number; total: number };
    };
};

function Catalog({ catalog }: CatalogPageProps) {
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';
    const [filters, setFilters] = useState<FilterState>(catalog.activeFilters);

    const navigate = (state: Partial<CatalogQueryState>) => {
        const query = {
            category: state.categories ?? filters.categories,
            size: state.sizes ?? filters.sizes,
            color: state.colors ?? filters.colors,
            collection: state.collections ?? filters.collections,
            minPrice: state.minPrice ?? filters.minPrice,
            maxPrice: state.maxPrice ?? filters.maxPrice,
            sort: state.sort ?? catalog.sort,
            page: state.page ?? 1,
        };

        router.get(catalogRoute.url({ lang }, { query }), {}, { preserveScroll: true, preserveState: true });
    };

    const clearFilters = () => {
        const cleared = { categories: [], sizes: [], colors: [], collections: [], minPrice: 50, maxPrice: 2500 };
        setFilters(cleared);
        navigate({ ...cleared, page: 1 });
    };

    return (
        <>
            <Head title={catalog.collection.name} />
            <main className="mx-auto max-w-[1920px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12 2xl:px-16">
                <div className="grid gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] xl:grid-cols-[12rem_minmax(0,1fr)] 2xl:grid-cols-[14rem_minmax(0,1fr)]">
                    <CatalogFilters filters={catalog.filters} onApply={() => navigate({ page: 1 })} onChange={setFilters} onClear={clearFilters} value={filters} />
                    <div className="min-w-0 space-y-8">
                        <CollectionHeader count={catalog.collection.count} name={catalog.collection.name} onSortChange={(sort) => navigate({ sort, page: 1 })} sort={catalog.sort} />
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
