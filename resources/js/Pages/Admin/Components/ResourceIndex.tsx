import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import admin from '@/routes/admin';

type ResourceName = 'products' | 'categories' | 'collections';

type ResourceRecord = {
    id: number;
    name: string;
    meta: string;
    detail?: string;
    media: string | null;
};

type ResourceIndexProps = {
    resource: ResourceName;
    title: string;
    description: string;
    records: ResourceRecord[];
};

const resourceRoutes = {
    products: {
        create: () => admin.products.create.url(),
        edit: (id: number) => admin.products.edit.url(id),
        destroy: (id: number) => admin.products.destroy.url(id),
    },
    categories: {
        create: () => admin.categories.create.url(),
        edit: (id: number) => admin.categories.edit.url(id),
        destroy: (id: number) => admin.categories.destroy.url(id),
    },
    collections: {
        create: () => admin.collections.create.url(),
        edit: (id: number) => admin.collections.edit.url(id),
        destroy: (id: number) => admin.collections.destroy.url(id),
    },
} satisfies Record<ResourceName, unknown>;

export default function ResourceIndex({ resource, title, description, records }: ResourceIndexProps) {
    const { t } = useTranslation('admin');
    const routes = resourceRoutes[resource] as {
        create: () => string;
        edit: (id: number) => string;
        destroy: (id: number) => string;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm text-slate-500">Artifacts / Admin</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight">{title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p>
                </div>
                <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-600/20" href={routes.create()}>
                    <Plus aria-hidden="true" size={17} />
                    Add {title.slice(0, -1)}
                </Link>
            </div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {records.length > 0 ? records.map((record) => (
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between" key={record.id}>
                        <div className="flex items-center gap-4">
                            <SafeImage alt={`${record.name} image`} className="h-70 w-40 rounded-lg object-cover" src={record.media}/>
                            <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-950">{record.name}</p>
                                <p className="mt-1 text-xs text-slate-500">{record.meta}</p>
                                {record.detail ? <p className="mt-1 truncate text-xs text-slate-400">{record.detail}</p> : null}
                            </div>

                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <Link className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-cyan-600 hover:text-cyan-700" href={routes.edit(record.id)}>
                                Edit <ArrowRight aria-hidden="true" size={15} />
                            </Link>
                            <Link
                                as="button"
                                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-rose-100 px-3 text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-4 focus:ring-rose-600/10"
                                href={routes.destroy(record.id)}
                                method="delete"
                                onBefore={() => window.confirm(`Delete ${record.name}?`)}
                                title={`Delete ${record.name}`}
                            >
                                <Trash2 aria-hidden="true" size={16} />
                                <span className="sr-only">Delete</span>
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="px-6 py-20 text-center text-sm text-slate-500">No {resource} have been added yet.</div>
                )}
            </section>
        </div>
    );
}

ResourceIndex.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

function SafeImage({ alt, className, src }: { alt: string; className: string; src: string | null }) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return <div aria-hidden="true" className={`${className} bg-slate-100`} />;
    }

    return <img alt={alt} className={className} onError={() => setHasError(true)} src={src} />;
}
