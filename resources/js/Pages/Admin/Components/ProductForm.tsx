import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { ArrowLeft, Plus, Save, Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import admin from '@/routes/admin';
import { useProductForm } from '@/Pages/Admin/Components/hooks/useProductForm';
import type { ProductFormFieldProps, ProductFormProps } from '@/Pages/Admin/Components/ProductFormTypes';

export default function ProductForm({ title, categories, values, recordId }: ProductFormProps) {
    const { form, submit, updateVariant, addVariant, removeVariant } = useProductForm({ values, recordId });

    return (
        <div className="mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-cyan-600 hover:text-cyan-700"
                    href={admin.products.index.url()}>
                    <ArrowLeft aria-hidden="true" size={17} />
                    <span className="sr-only">Back</span>
                </Link>
                <div>
                    <p className="text-sm text-slate-500">Artifacts / Admin</p>
                    <h2 className="mt-1 text-2xl font-bold tracking-tight">{title}</h2>
                </div>
            </div>

            <form className="space-y-6" onSubmit={submit}>
                <section className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-8">
                    <Field label="SPU" error={form.errors.spu}><input className="admin-input" value={form.data.spu} onChange={(event) => form.setData('spu', event.target.value)} /></Field>
                    <Field label="Slug" error={form.errors.slug}><input className="admin-input" value={form.data.slug} onChange={(event) => form.setData('slug', event.target.value)} /></Field>
                    <Field label="Name" error={form.errors.name}><input className="admin-input" value={form.data.name} onChange={(event) => form.setData('name', event.target.value)} /></Field>
                    <Field label="Eyebrow" error={form.errors.eyebrow}><input className="admin-input" value={form.data.eyebrow} onChange={(event) => form.setData('eyebrow', event.target.value)} /></Field>
                    <Field label="Badge" error={form.errors.badge}><input className="admin-input" value={form.data.badge} onChange={(event) => form.setData('badge', event.target.value)} /></Field>
                    <Field label="Sex" error={form.errors.sex}>
                        <select className="admin-input" value={form.data.sex} onChange={(event) => form.setData('sex', event.target.value)}>
                            <option value="unisex">Unisex</option>
                            <option value="woman">Woman</option>
                            <option value="man">Man</option>
                        </select>
                    </Field>
                    <Field label="Description" error={form.errors.description}>
                        <textarea className="admin-input min-h-32 py-3" value={form.data.description} onChange={(event) => form.setData('description', event.target.value)} />
                    </Field>
                    <Field label="Categories" error={form.errors.category_ids}>
                        <select className="admin-input min-h-32" multiple value={form.data.category_ids.map(String)} onChange={(event) => form.setData('category_ids', Array.from(event.target.selectedOptions, (option) => Number(option.value)))}>
                            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                        </select>
                    </Field>
                </section>

                <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                        <div><h3 className="text-lg font-bold">Variants</h3><p className="mt-1 text-sm text-slate-500">Define each color and size combination.</p></div>
                        <button className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-cyan-600 hover:text-cyan-700" onClick={addVariant} type="button"><Plus aria-hidden="true" size={16} /> Add variant</button>
                    </div>
                    <div className="space-y-4">
                        {form.data.variants.map((variant, index) => (
                            <div className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4" key={`${variant.sku}-${index}`}>
                                {(['sku', 'color', 'color_label', 'color_hex', 'size', 'price', 'stock'] as const).map((field) => (
                                    <Field key={field} label={field.replace('_', ' ')} error={form.errors[`variants.${index}.${field}`]}>
                                        <input className="admin-input bg-white" type={field === 'price' || field === 'stock' ? 'number' : 'text'} value={variant[field]} onChange={(event) => updateVariant(index, field, event.target.value)} />
                                    </Field>
                                ))}
                                <button className="inline-flex min-h-10 items-center justify-center gap-2 self-end rounded-lg border border-rose-100 px-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40" disabled={form.data.variants.length === 1} onClick={() => removeVariant(index)} type="button"><Trash2 aria-hidden="true" size={15} /> Remove</button>
                            </div>
                        ))}
                    </div>
                </section>

                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-600/20 disabled:cursor-not-allowed disabled:opacity-60" disabled={form.processing} type="submit"><Save aria-hidden="true" size={16} />{form.processing ? 'Saving...' : 'Save product'}</button>
            </form>
        </div>
    );
}

function Field({ children, error, label }: ProductFormFieldProps) {
    return <label className="block space-y-2 text-sm font-semibold capitalize text-slate-700">{label}{children}{error ? <span className="block text-xs font-medium normal-case text-rose-600">{error}</span> : null}</label>;
}

ProductForm.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;