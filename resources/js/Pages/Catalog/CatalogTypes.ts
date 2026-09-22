export type FilterOption = {
    value: string;
    label: string;
};

export type ColorOption = FilterOption & {
    hex: string;
};

export type CatalogProduct = {
    id: string;
    name: string;
    category: string;
    collection: string;
    price: string;
    badge?: string;
    colors: string[];
    image: string;
};

export type FilterState = {
    categories: string[];
    sizes: string[];
    colors: string[];
    collections: string[];
    minPrice: number;
    maxPrice: number;
};

export type CatalogQueryState = FilterState & {
    sort: string;
    search: string;
    page: number;
};

export type CatalogPageProps = {
    locale?: string;
    catalog: {
        collection: {
            name: string;
            count: number;
            image: string;
        };
        filters: {
            categories: FilterOption[];
            sizes: string[];
            colors: ColorOption[];
            collections: FilterOption[];
        };
        activeFilters: FilterState;
        sort: string;
        search: string;
        products: CatalogProduct[];
        pagination: {
            currentPage: number;
            lastPage: number;
            perPage: number;
            total: number;
        };
    };
};