import type { ReactNode } from 'react';

export type ResourceFormResource = 'categories' | 'collections';

export type ResourceFormValues = {
    name: string;
    slug?: string;
    product_ids?: number[];
};

export type ProductOption = { id: number; name: string };

export type ResourceFormProps = {
    resource: ResourceFormResource;
    title: string;
    values: ResourceFormValues;
    products?: ProductOption[];
    recordId?: number | null;
};

export type UseResourceFormParams = {
    resource: ResourceFormResource;
    values: ResourceFormValues;
    recordId?: number | null;
};

export type ResourceFormFieldProps = {
    children: ReactNode;
    error?: string;
    label: string;
};
