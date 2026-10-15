import { useTranslation } from 'react-i18next';
import { ConfirmationModal } from '@/Components/ui/ConfirmationModal';
import { StatusBadge } from '@/Pages/Admin/Chat/Components/StatusBadge';
import { useChatHeader } from '@/Pages/Admin/Chat/hooks/useChatHeader';
import { useInitials } from '@/Pages/Admin/Chat/hooks/useChat';
import type { ChatHeaderProps } from '@/Pages/Admin/Chat/ChatTypes';

export function ChatHeader({ chat, onClosed }: ChatHeaderProps) {
    const { t } = useTranslation('admin');
    const initials = useInitials(chat.user.name);
    const { closeModalOpen, processing, openCloseModal, cancelClose, closeConversation } = useChatHeader(chat, onClosed);

    return (
        <header className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-800">{initials}</div>
                <div className="min-w-0">
                    <h3 className="truncate font-semibold">{chat.user.name}</h3>
                    <p className="truncate text-xs text-slate-500">{chat.user.email}</p>
                </div>
                <StatusBadge status={chat.status} t={t} />
                {chat.status !== 'close' ? <button className="ml-auto rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50" disabled={processing} onClick={openCloseModal} type="button">{t('chatClose')}</button> : null}
            </div>
            <ConfirmationModal
                cancelLabel={t('cancel')}
                confirmLabel={t('chatClose')}
                description={t('chatCloseConfirm')}
                onCancel={cancelClose}
                onConfirm={closeConversation}
                open={closeModalOpen}
                processing={processing}
                title={t('chatCloseTitle')}
            />
        </header>
    );
}