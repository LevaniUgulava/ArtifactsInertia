import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/Components/Brand/Brand';
import { Header } from '@/Layouts/Header/Header';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    const { t } = useTranslation('checkout');

    return (
        <>
            <Head title={brandTitle(t('title'))} />

            <div className="min-h-screen bg-brand-stone font-sans text-brand-charcoal">
                <Header />
                <main>{children}</main>
            </div>
        </>
    );
}
