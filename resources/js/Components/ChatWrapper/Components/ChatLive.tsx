import { useEcho } from '@laravel/echo-react';
import type { ChatBroadcastPayload, ChatStatusPayload } from '@/Pages/Admin/Chat/ChatTypes';
import type { ChatLiveProps } from '@/types/components';

export function ChatLive({ chatId, onMessage }: ChatLiveProps) {
    useEcho<ChatBroadcastPayload | ChatStatusPayload>(`chat.${chatId}`, ['.MessageSent', '.ChatStatusChanged'], onMessage, [chatId, onMessage]);

    return null;
}