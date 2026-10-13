import { useHttp } from '@inertiajs/react';
import { Send } from 'lucide-react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatMessage } from '@/Pages/Admin/Chat/ChatTypes';
import admin from '@/routes/admin';

type MessageComposerProps = {
    chatId: string;
    onSent: (message: ChatMessage) => void;
};

export function MessageComposer({ chatId, onSent }: MessageComposerProps) {
    const { t } = useTranslation('admin');
    const http = useHttp<{ message: string }>({ message: '' });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = http.data.message.trim();

        if (!message || http.processing) {
            return;
        }

        http.post(admin.chat.message({ chat: chatId }).url, {
            onSuccess: (payload) => {
                const created = (payload as { message?: ChatMessage }).message;

                if (created) {
                    onSent(created);
                }

                http.setData('message', '');
            },
        });
    }

    return (
        <form className="flex items-center gap-2 border-t border-slate-200 bg-white p-3" onSubmit={handleSubmit}>
            <input
                aria-label={t('chatPlaceholder')}
                className="h-10 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"
                onChange={(event) => http.setData('message', event.target.value)}
                placeholder={t('chatPlaceholder')}
                type="text"
                value={http.data.message}
            />
            <button
                aria-label={t('chatSend')}
                className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={!http.data.message.trim() || http.processing}
                type="submit"
            >
                <Send aria-hidden="true" size={16} />
            </button>
        </form>
    );
}