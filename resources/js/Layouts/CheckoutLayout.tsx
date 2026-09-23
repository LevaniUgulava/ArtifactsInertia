import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import { Header } from '@/Layouts/Header/Header';
import type { CheckoutLayoutProps } from '@/types/layouts';

export default function CheckoutLayout({ children }: CheckoutLayoutProps) {
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
