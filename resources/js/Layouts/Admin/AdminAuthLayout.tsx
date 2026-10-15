import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import type { AdminAuthLayoutProps } from '@/Layouts/Admin/AdminTypes';

export default function AdminAuthLayout({ children, description, onSubmit, title }: AdminAuthLayoutProps) {
    const { t } = useTranslation('admin');

    return (
        <>
            <Head title={brandTitle(title)} />
            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-8 font-sans text-slate-950 sm:px-8">
                <div className="w-full max-w-md">
                    <div className="mb-6 text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">ARTIFACTS / ADMIN</p>
                        <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
                    </div>
                    <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-7" onSubmit={onSubmit}>
                        {children}
                    </form>
                    <p className="mt-5 text-center text-xs text-slate-400">{t('navigation')}</p>
                </div>
            </main>
        </>
    );
}
