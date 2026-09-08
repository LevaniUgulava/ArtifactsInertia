import { Footer } from '@/Layouts/Footer/Footer';
import { Header } from '@/Layouts/Header/Header';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-white font-sans text-stone-950">
            <Header />
            {children}
            <Footer />
        </div>
    );
}