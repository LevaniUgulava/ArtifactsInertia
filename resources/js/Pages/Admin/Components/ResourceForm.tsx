import { Link, useForm } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import admin from '@/routes/admin';

type ProductOption = { id: number; name: string };

type ResourceFormProps = {
    resource: 'categories' | 'collections';
    title: string;
    values: {
        name: string;
        slug?: string;
        product_ids?: number[];
    };
    products?: ProductOption[];
    recordId?: number | null;
};

export default function ResourceForm({ resource, title, values, products = [], recordId }: ResourceFormProps) {
    const form = useForm(values);
    const isEditing = recordId != null;
    const endpoint = resource === 'categories'
        ? (isEditing ? admin.categories.update(recordId).url : admin.categories.store().url)
        : (isEditing ? admin.collections.update(recordId).url : admin.collections.store().url);

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isEditing) {
            form.put(endpoint);
        } else {
            form.post(endpoint);
        }
    }

    return (
        <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex items-center gap-4">
                <Link className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-600 hover:text-cyan-700" href={resource === 'categories' ? admin.categories.index.url() : admin.collections.index.url()}>
                    <ArrowLeft aria-hidden="true" size={17} />
                    <span className="sr-only">Back</span>
                </Link>
                <div>
                    <p className="text-sm text-slate-500">Artifacts / Admin</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight">{title}</h2>
                </div>
            </div>

            <form className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" onSubmit={submit}>
                <Field label="Name" error={form.errors.name}>
                    <input className="admin-input" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} />
                </Field>

                {resource === 'collections' ? (
                    <>
                        <Field label="Slug" error={form.errors.slug}>
                            <input className="admin-input" value={form.data.slug ?? ''} onChange={(event) => form.setData('slug', event.target.value)} />
                        </Field>
                        <Field label="Products" error={form.errors.product_ids}>
                            <select className="admin-input min-h-32" multiple value={(form.data.product_ids ?? []).map(String)} onChange={(event) => form.setData('product_ids', Array.from(event.target.selectedOptions, (option) => Number(option.value)))}>
                                {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
                            </select>
                        </Field>
                    </>
                ) : null}

                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-600/20 disabled:cursor-not-allowed disabled:opacity-60" disabled={form.processing} type="submit">
                    <Save aria-hidden="true" size={16} />
                    {form.processing ? 'Saving...' : 'Save changes'}
                </button>
            </form>
        </div>
    );
}

function Field({ children, error, label }: { children: ReactNode; error?: string; label: string }) {
    return (
        <label className="block space-y-2 text-sm font-semibold text-slate-700">
            {label}
            {children}
            {error ? <span className="block text-xs font-medium text-rose-600">{error}</span> : null}
        </label>
    );
}

ResourceForm.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
