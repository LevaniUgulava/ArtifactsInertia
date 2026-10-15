import { useHttp } from '@inertiajs/react';
import type { FormEvent } from 'react';
import type { ChatMessage } from '@/Pages/Admin/Chat/ChatTypes';
import admin from '@/routes/admin';

export function useMessageComposer(chatId: string, onSent: (message: ChatMessage) => void) {
    const http = useHttp<{ message: string }>({ message: '' });

    function setMessage(value: string): void {
        http.setData('message', value);
    }

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

    return { message: http.data.message, processing: http.processing, setMessage, handleSubmit };
}