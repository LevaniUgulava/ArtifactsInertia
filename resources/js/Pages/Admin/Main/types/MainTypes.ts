export type AdminStats = {
    products: number;
    variants: number;
    categories: number;
    collections: number;
};

export type AdminInventory = {
    lowStock: number;
    outOfStock: number;
};

export type AdminRecentProduct = {
    id: number;
    name: string;
    slug: string;
};

export type AdminDashboardProps = {
    stats: AdminStats;
    inventory: AdminInventory;
    recentProducts: AdminRecentProduct[];
};
