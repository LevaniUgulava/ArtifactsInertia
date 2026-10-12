import ChatWrapper from '@/Components/ChatWrapper';
import { SupportChatButton } from '@/Components/SupportChatButton';
import { Footer } from '@/Layouts/Footer/Footer';
import { Header } from '@/Layouts/Header/Header';
import type { RootLayoutProps } from '@/types/layouts';

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <div className="min-h-screen bg-brand-stone font-sans text-brand-charcoal">
            <Header />
            {children}
            <Footer />
            <ChatWrapper>
                <SupportChatButton />
            </ChatWrapper>
        </div>
    );
}
