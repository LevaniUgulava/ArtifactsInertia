import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { catalog as catalogRoute } from '@/routes';
import type { CatalogPageProps, CatalogQueryState, FilterState } from '../CatalogTypes';

export function useCatalog(catalog: CatalogPageProps['catalog']) {
    const lang = useLocale();
    const [filters, setFilters] = useState<FilterState>(catalog.activeFilters);
    const [search, setSearch] = useState(catalog.search);

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

    const applyFilters = (value: FilterState) => {
        setFilters(value);
        navigate({ ...value, page: 1 });
    };

    const clearFilters = () => {
        const cleared = { categories: [], sizes: [], colors: [], collections: [], minPrice: 50, maxPrice: 2500 };
        applyFilters(cleared);
    };

    const clearSearch = () => {
        setSearch('');
        navigate({ search: '', page: 1 });
    };

    return {
        filters,
        search,
        navigate,
        applyFilters,
        clearFilters,
        clearSearch,
    };
}