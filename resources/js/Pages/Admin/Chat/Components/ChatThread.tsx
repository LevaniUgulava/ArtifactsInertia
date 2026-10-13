import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ChatHeader } from '@/Pages/Admin/Chat/Components/ChatHeader';
import { MessageComposer } from '@/Pages/Admin/Chat/Components/MessageComposer';
import { MessagesList } from '@/Pages/Admin/Chat/Components/MessagesList';
import type { ChatMessage, SelectedChat } from '@/Pages/Admin/Chat/ChatTypes';

type ChatThreadProps = {
    chat: SelectedChat | null;
    onSent: (message: ChatMessage) => void;
    onClosed: () => void;
};

export function ChatThread({ chat, onSent, onClosed }: ChatThreadProps) {
    const { t } = useTranslation('admin');

    if (!chat) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <MessageCircle aria-hidden="true" className="text-slate-300" size={38} />
                <p className="mt-4 text-sm text-slate-500">{t('chatSelect')}</p>
            </div>
        );
    }

    return (
        <>
            <ChatHeader chat={chat} onClosed={onClosed} />
            <MessagesList messages={chat.messages} />
            <MessageComposer chatId={chat.id} onSent={onSent} />
        </>
    );
}
