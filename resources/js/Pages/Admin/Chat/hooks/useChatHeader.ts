import { useHttp } from '@inertiajs/react';
import { useState } from 'react';
import type { SelectedChat } from '@/Pages/Admin/Chat/ChatTypes';
import admin from '@/routes/admin';

export function useChatHeader(chat: SelectedChat, onClosed: () => void) {
    const http = useHttp();
    const [closeModalOpen, setCloseModalOpen] = useState(false);

    function openCloseModal(): void {
        setCloseModalOpen(true);
    }

    function cancelClose(): void {
        setCloseModalOpen(false);
    }

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

    return { closeModalOpen, processing: http.processing, openCloseModal, cancelClose, closeConversation };
}