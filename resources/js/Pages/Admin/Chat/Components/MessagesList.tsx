import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useFormatDate } from '@/Pages/Admin/Chat/hooks/useChat';
import type { MessagesListProps } from '@/Pages/Admin/Chat/ChatTypes';

export function MessagesList({ messages }: MessagesListProps) {
    const { t } = useTranslation('admin');
    const formatDate = useFormatDate();

    return (
        <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/70 px-5 py-6 sm:px-8">
            {messages.length > 0 ? messages.map((message) => (
                <div className={cn('flex', message.isAdmin ? 'justify-end' : 'justify-start')} key={message.id}>
                    <div className={cn('max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[70%]', message.isAdmin ? 'rounded-br-md bg-slate-950 text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-700')}>
                        {message.imageUrls?.length ? message.imageUrls.map((imageUrl) => (
                            <img alt="" className="mb-2 max-h-40 max-w-full rounded-lg object-cover" key={imageUrl} src={imageUrl} />
                        )) : null}
                        <p className="whitespace-pre-wrap break-words">{message.message}</p>
                        <p className="mt-2 text-[10px] text-slate-400">
                            {message.isAdmin ? t('chat') : message.sender} · {formatDate(message.createdAt)}
                        </p>
                    </div>
                </div>
            )) : <p className="py-12 text-center text-sm text-slate-500">{t('chatNoMessages')}</p>}
        </div>
    );
}