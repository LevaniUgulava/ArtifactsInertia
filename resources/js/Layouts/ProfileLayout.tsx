import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/Layouts/Header/Header';
import { ProfileSidebar } from '@/Pages/Profile/Components/ProfileSidebar';

export default function ProfileLayout({ children }: { children: ReactNode }) {
    const { t } = useTranslation('profile');

    return (
        <>
            <Head title={`${t('title')} | Atelier Street`} />

            <div className="min-h-screen bg-white font-sans text-stone-950">
                <Header />
                <div className="flex min-h-[calc(100vh-73px)] flex-col md:flex-row">
                    <ProfileSidebar />
                    <main className="min-w-0 flex-1">{children}</main>
                </div>
            </div>
        </>
    );
}
