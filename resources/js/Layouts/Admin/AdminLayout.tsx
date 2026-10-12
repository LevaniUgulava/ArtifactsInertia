import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import type { AdminLayoutProps } from '@/types/layouts';
import { AdminSidebar } from './AdminSidebar';

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { t } = useTranslation('admin');

    return (
        <>
            <Head title={brandTitle(t('title'))} />
            <div className="min-h-screen bg-slate-100 font-sans text-slate-950">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <AdminSidebar />
                    <main className="min-w-0 flex-1">
                        <div className="border-b border-slate-200 bg-slate-100 px-5 py-5 sm:px-8 lg:px-10 lg:py-8">
                            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Artifacts / Admin</p>
                                    <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t('title')}</h1>
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <label className="relative block min-w-0 sm:min-w-72">
                                        <span className="sr-only">{t('search')}</span>
                                        <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                                        <input className="min-h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10" placeholder={t('search')} type="search" />
                                    </label>
                                    <select aria-label={t('dateRange')} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 outline-none transition hover:border-slate-300 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10">
                                        <option>{t('dateRange')}</option>
                                        <option>Last 7 days</option>
                                        <option>Last 90 days</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-5 py-6 sm:px-8 lg:px-10 lg:py-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
