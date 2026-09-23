export type ProductImage = {
    src: string;
    alt: string;
};

export type ProductColor = {
    value: string;
    label: string;
    hex: string;
    availableSizes: string[];
};

export type ProductSize = {
    value: string;
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

export type AddToCartInput = {
    slug: string;
    color: string;
    size: string;
};

export type ProductPageProps = {
    product: ProductData;
};

export type ProductBreadcrumbProps = {
    category: string;
    name: string;
};

export type ProductGalleryProps = {
    images: ProductImage[];
};

export type ProductPurchasePanelProps = {
    product: ProductData;
};

export type ProductActionsProps = {
    canAddToCart: boolean;
    addedToCart: boolean;
    wishlisted: boolean;
    processing: boolean;
    error?: string;
    onAddToCart: () => void;
    onWishlist: () => void;
};

export type ProductVariantSelectorProps = {
    availableSizes: string[];
    colors: ProductColor[];
    sizes: ProductSize[];
    selectedColor: string;
    selectedSize: string;
    onColorChange: (value: string) => void;
    onSizeChange: (value: string) => void;
    onSizeChart: () => void;
};

export type ProductDetailsProps = {
    details: ProductDetail[];
};

export type ProductBenefitsProps = {
    benefits: ProductBenefit[];
};