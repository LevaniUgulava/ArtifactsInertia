import { Footer } from '@/Layouts/Footer/Footer';
import { Header } from '@/Layouts/Header/Header';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-brand-stone font-sans text-brand-charcoal">
            <Header />
            {children}
            <Footer />
        </div>
    );
}
