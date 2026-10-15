import type { ReactNode } from 'react';

export type CategoryOption = { id: number; name: string };

export type VariantForm = {
    sku: string;
    color: string;
    color_label: string;
    color_hex: string;
    size: string;
    price: string | number;
    stock: string | number;
};

export type ProductFormData = {
    spu: string;
    slug: string;
    name: string;
    eyebrow: string;
    description: string;
    badge: string;
    sex: string;
    category_ids: number[];
    benefits: { label: string; icon: string }[];
    details: { title: string; paragraphs: string[]; bullets: string[] }[];
    variants: VariantForm[];
};

export type ProductFormProps = {
    title: string;
    categories: CategoryOption[];
    values: ProductFormData;
    recordId?: number | null;
};

export type UseProductFormParams = {
    values: ProductFormData;
    recordId?: number | null;
};

export type ProductFormFieldProps = {
    children: ReactNode;
    error?: string;
    label: string;
};
