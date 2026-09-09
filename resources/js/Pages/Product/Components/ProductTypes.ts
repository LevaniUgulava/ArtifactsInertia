export type ProductImage = {
    src: string;
    alt: string;
};

export type ProductColor = {
    value: string;
    label: string;
    hex: string;
};

export type ProductSize = {
    value: string;
    available: boolean;
};

export type ProductBenefit = {
    label: string;
    icon: 'truck' | 'rotate' | 'shield';
};

export type ProductDetail = {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
};

export type ProductData = {
    slug: string;
    name: string;
    eyebrow: string;
    category: string;
    collection: string;
    price: string;
    description: string;
    images: ProductImage[];
    colors: ProductColor[];
    sizes: ProductSize[];
    benefits: ProductBenefit[];
    details: ProductDetail[];
};
