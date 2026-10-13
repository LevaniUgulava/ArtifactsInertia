import { useHttp } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StatusBadge } from '@/Pages/Admin/Chat/Components/StatusBadge';
import { useInitials } from '@/Pages/Admin/Chat/hooks/useChat';
import type { SelectedChat } from '@/Pages/Admin/Chat/ChatTypes';
import admin from '@/routes/admin';
import { ConfirmationModal } from '@/Components/ui/ConfirmationModal';

type ChatHeaderProps = {
    chat: SelectedChat;
    onClosed: () => void;
};

export function ChatHeader({ chat, onClosed }: ChatHeaderProps) {
    const { t } = useTranslation('admin');
    const initials = useInitials(chat.user.name);
    const http = useHttp();
    const [closeModalOpen, setCloseModalOpen] = useState(false);

    function closeConversation(): void {
        if (chat.status === 'close' || http.processing) {
            return;
        }

        http.post(admin.chat.close({ chat: chat.id }).url, {
            onSuccess: () => {
                setCloseModalOpen(false);
                onClosed();
            },
        });
    }

    return (
        <header className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-800">{initials}</div>
                <div className="min-w-0">
                    <h3 className="truncate font-semibold">{chat.user.name}</h3>
                    <p className="truncate text-xs text-slate-500">{chat.user.email}</p>
                </div>
                <StatusBadge status={chat.status} t={t} />
                {chat.status !== 'close' ? <button className="ml-auto rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50" disabled={http.processing} onClick={() => setCloseModalOpen(true)} type="button">{t('chatClose')}</button> : null}
            </div>
            <ConfirmationModal
                cancelLabel={t('cancel')}
                confirmLabel={t('chatClose')}
                description={t('chatCloseConfirm')}
                onCancel={() => setCloseModalOpen(false)}
                onConfirm={closeConversation}
                open={closeModalOpen}
                processing={http.processing}
                title={t('chatCloseTitle')}
            />
        </header>
    );
}
