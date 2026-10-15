import { Boxes, FolderKanban, Package, Tags, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { AdminStatCard } from '@/Pages/Admin/Main/Components/AdminStatCard';
import type { AdminDashboardProps } from '@/Pages/Admin/Main/MainTypes';

function Dashboard({ stats, inventory, recentProducts }: AdminDashboardProps) {
    const { t } = useTranslation('admin');

    return (
        <div className="space-y-6 lg:space-y-8">
            <section aria-labelledby="catalog-health-heading">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <div>
                        <p className="text-sm text-slate-500">{t('catalogHealth')}</p>
                        <h2 className="mt-1 text-xl font-bold tracking-tight" id="catalog-health-heading">{t('catalogHealth')}</h2>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <AdminStatCard icon={Package} label={t('totalProducts')} tone="bg-cyan-50 text-cyan-700" value={stats.products} />
                    <AdminStatCard icon={Boxes} label={t('totalVariants')} tone="bg-violet-50 text-violet-700" value={stats.variants} />
                    <AdminStatCard icon={Tags} label={t('totalCategories')} tone="bg-amber-50 text-amber-700" value={stats.categories} />
                    <AdminStatCard icon={FolderKanban} label={t('totalCollections')} tone="bg-emerald-50 text-emerald-700" value={stats.collections} />
                </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(18rem,0.8fr)]">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="recent-products-heading">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-slate-500">{t('catalogHealth')}</p>
                            <h2 className="mt-1 text-xl font-bold tracking-tight" id="recent-products-heading">{t('recentProducts')}</h2>
                        </div>
                        <Package aria-hidden="true" className="text-slate-300" size={22} strokeWidth={1.6} />
                    </div>
                    {recentProducts.length > 0 ? (
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {recentProducts.map((product) => (
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4" key={product.id}>
                                    <p className="truncate font-semibold text-slate-900">{product.name}</p>
                                    <p className="mt-1 truncate text-xs text-slate-500">{product.slug}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center text-sm text-slate-500">{t('noProducts')}</div>
                    )}
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="inventory-status-heading">
                    <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-full bg-orange-50 text-orange-600"><TriangleAlert aria-hidden="true" size={18} /></span>
                        <div>
                            <p className="text-sm text-slate-500">{t('catalogHealth')}</p>
                            <h2 className="mt-1 text-xl font-bold tracking-tight" id="inventory-status-heading">{t('inventoryStatus')}</h2>
                        </div>
                    </div>
                    <div className="mt-8 space-y-5">
                        <div className="flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
                            <span className="text-sm text-slate-600">{t('lowStock')}</span>
                            <span className="text-2xl font-bold text-orange-600">{inventory.lowStock}</span>
                        </div>
                        <div className="flex items-end justify-between gap-4">
                            <span className="text-sm text-slate-600">{t('outOfStock')}</span>
                            <span className="text-2xl font-bold text-rose-600">{inventory.outOfStock}</span>
                        </div>
                    </div>
                </section>
            </div>

            <section className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 sm:p-8" aria-labelledby="catalog-management-heading">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">Artifacts catalog</p>
                    <h2 className="mt-2 text-xl font-bold tracking-tight" id="catalog-management-heading">{t('catalogManagement')}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{t('catalogManagementDescription')}</p>
                </div>
            </section>
        </div>
    );
}

Dashboard.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default Dashboard;
