import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/Layouts/Header/Header';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    const { t } = useTranslation('checkout');

    return (
        <>
            <Head title={`${t('title')} | Atelier Street`} />

            <div className="min-h-screen bg-[#fafafa] font-sans text-stone-950">
                <Header />
                <main>{children}</main>
            </div>
        </>
    );
}
