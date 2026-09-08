import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { Header } from '@/Layouts/Header/Header';

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head title="Checkout | Atelier Street" />

            <div className="min-h-screen bg-[#fafafa] font-sans text-stone-950">
                <Header />
                <main>{children}</main>
            </div>
        </>
    );
}
