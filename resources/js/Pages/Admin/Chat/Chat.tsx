import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { ChatList } from '@/Pages/Admin/Chat/Components/ChatList';
import { ChatThread } from '@/Pages/Admin/Chat/Components/ChatThread';
import type { ChatProps } from '@/Pages/Admin/Chat/ChatTypes';
import { useAdminChat } from '@/Pages/Admin/Chat/hooks/useAdminChat';

export default function Chat({ chats: initialChats, selectedChat }: ChatProps) {
    const { t } = useTranslation('admin');
    const { chats, currentChat, selectChat, handleThreadMessage, handleThreadClosed } = useAdminChat({
        chats: initialChats,
        selectedChat,
    });

    return (
        <div className="space-y-6">
            <div>
                <p className="text-sm text-slate-500">Artifacts / Admin</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">{t('chat')}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">{t('chatDescription')}</p>
            </div>

            <section className="grid min-h-155 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[20rem_minmax(0,1fr)]">
                <ChatList chats={chats} onSelect={selectChat} selectedChatId={currentChat?.id} />
                <div className="flex min-h-155 min-w-0 flex-col">
                    <ChatThread chat={currentChat} onClosed={handleThreadClosed} onSent={handleThreadMessage} />
                </div>
            </section>
        </div>
    );
}

Chat.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;