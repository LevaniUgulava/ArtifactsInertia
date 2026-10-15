import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import type { AdminLayoutProps } from '@/types/layouts';
import { AdminSidebar } from '@/Layouts/Admin/AdminSidebar/AdminSidebar';

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { t } = useTranslation('admin');

    return (
        <>
            <Head title={brandTitle(t('title'))} />
            <div className="min-h-screen bg-slate-100 font-sans text-slate-950">
                <div className="flex min-h-screen flex-col lg:flex-row">
                    <AdminSidebar />
                    <main className="min-w-0 flex-1">
                        <div className="px-5 py-6 sm:px-8 lg:px-10 lg:py-8">{children}</div>
                    </main>
                </div>
            </div>
        </>
    );
}
