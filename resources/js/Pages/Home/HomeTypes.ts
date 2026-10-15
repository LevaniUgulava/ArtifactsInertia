export type Product = {
    id: string;
    image: string;
    name: string;
    price: string;
};

export type CollectionBanner = {
    name: string;
    slug: string;
    image: string;
};

export type HomePageProps = {
    newArrivals: Product[];
    trendingProducts: Product[];
    collections: CollectionBanner[];
};

export type ProductGridProps = {
    products: Product[];
};

export type NewArrivalsProps = {
    products: Product[];
};

export type TrendingNowProps = {
    products: Product[];
};

export type CollectionBannersProps = {
    collections: CollectionBanner[];
};

export type SectionTitleProps = {
    eyebrow: string;
    title: string;
};