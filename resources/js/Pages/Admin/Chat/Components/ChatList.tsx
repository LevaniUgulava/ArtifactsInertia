import { Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/Pages/Admin/Chat/Components/StatusBadge';
import { useFormatDate } from '@/Pages/Admin/Chat/hooks/useChat';
import type { ChatListItem } from '@/Pages/Admin/Chat/ChatTypes';

type ChatListProps = {
    chats: ChatListItem[];
    selectedChatId?: string;
    onSelect: (chatId: string) => void;
};

export function ChatList({ chats, selectedChatId, onSelect }: ChatListProps) {
    const { t } = useTranslation('admin');
    const formatDate = useFormatDate();

    return (
        <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
                <Inbox aria-hidden="true" className="text-cyan-700" size={18} />
                <h3 className="font-semibold">{t('chatInbox')}</h3>
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">{chats.length}</span>
            </div>
            <div className="max-h-155 overflow-y-auto p-2">
                {chats.length > 0 ? chats.map((chat) => {
                    const active = selectedChatId === chat.id;

                    return (
                        <button
                            className={cn('mb-1 block w-full cursor-pointer rounded-xl px-3 py-3 text-left transition hover:bg-slate-100', active && 'bg-slate-950 text-white hover:bg-slate-900')}
                            key={chat.id}
                            onClick={() => onSelect(chat.id)}
                            type="button"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <p className="truncate text-sm font-semibold">{chat.user.name}</p>
                                <StatusBadge active={active} status={chat.status} t={t} />
                            </div>
                            <p className={cn('mt-1 truncate text-xs', active ? 'text-slate-300' : 'text-slate-500')}>{chat.user.email}</p>
                            <p className={cn('mt-2 truncate text-xs', active ? 'text-slate-300' : 'text-slate-500')}>{chat.lastMessage ?? t('chatNoMessages')}</p>
                            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                                <span>{chat.messagesCount} {chat.messagesCount === 1 ? 'message' : 'messages'}</span>
                                <span>{formatDate(chat.updatedAt)}</span>
                            </div>
                        </button>
                    );
                }) : <p className="px-3 py-8 text-center text-sm text-slate-500">{t('chatEmpty')}</p>}
            </div>
        </aside>
    );
}