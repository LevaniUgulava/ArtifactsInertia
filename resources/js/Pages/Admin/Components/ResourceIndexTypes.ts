export type ResourceName = 'products' | 'categories' | 'collections';

export type ResourceRecord = {
    id: number;
    name: string;
    meta: string;
    detail?: string;
    media: string | null;
};

export type ResourceIndexProps = {
    resource: ResourceName;
    title: string;
    description: string;
    records: ResourceRecord[];
};

export type ResourceSafeImageProps = {
    alt: string;
    className: string;
    src: string | null;
};
