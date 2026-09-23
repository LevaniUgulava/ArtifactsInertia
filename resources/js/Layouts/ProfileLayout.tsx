import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import { Header } from '@/Layouts/Header/Header';
import { ProfileSidebar } from '@/Pages/Profile/Components/ProfileSidebar';
import type { ProfileLayoutProps } from '@/types/layouts';

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    const { t } = useTranslation('profile');

    return (
        <>
            <Head title={brandTitle(t('title'))} />

            <div className="min-h-screen bg-brand-stone font-sans text-brand-charcoal">
                <Header />
                <div className="flex min-h-[calc(100vh-73px)] flex-col md:flex-row">
                    <ProfileSidebar />
                    <main className="min-w-0 flex-1">{children}</main>
                </div>
            </div>
        </>
    );
}
