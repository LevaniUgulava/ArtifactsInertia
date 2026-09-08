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
    page: number;
};
