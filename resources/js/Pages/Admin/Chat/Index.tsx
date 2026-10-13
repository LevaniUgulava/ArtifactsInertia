import { useEcho } from '@laravel/echo-react';
import { useHttp } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { ChatList } from '@/Pages/Admin/Chat/Components/ChatList';
import { ChatThread } from '@/Pages/Admin/Chat/Components/ChatThread';
import type { ChatBroadcastPayload, ChatListItem, ChatMessage, ChatProps, ChatStatusPayload, SelectedChat } from '@/Pages/Admin/Chat/ChatTypes';
import admin from '@/routes/admin';

export default function Index({ chats: initialChats, selectedChat }: ChatProps) {
    const { t } = useTranslation('admin');
    const [chats, setChats] = useState<ChatListItem[]>(initialChats);
    const [currentChat, setCurrentChat] = useState<SelectedChat | null>(selectedChat);
    const appliedIdsRef = useRef<Set<number>>(new Set());
    const http = useHttp();

    useEffect(() => {
        setChats(initialChats);
    }, [initialChats]);

    useEffect(() => {
        if (selectedChat) {
            setCurrentChat(selectedChat);
        }
    }, [selectedChat]);

    function selectChat(chatId: string) {
        if (chatId === currentChat?.id) {
            return;
        }

        http.get(admin.chat.show({ chat: chatId }).url, {
            onSuccess: (data) => setCurrentChat(data as SelectedChat),
        });
    }

    const applyMessage = useCallback((payload: ChatBroadcastPayload) => {
        if (appliedIdsRef.current.has(payload.id)) {
            return;
        }

        appliedIdsRef.current.add(payload.id);

        setChats((current) => {
            const exists = current.some((chat) => chat.id === payload.supportChatId);
            const updated = exists
                ? current.map((chat) => (chat.id === payload.supportChatId
                    ? {
                        ...chat,
                        messagesCount: chat.messagesCount + 1,
                        lastMessage: payload.message,
                        updatedAt: payload.createdAt ?? new Date().toISOString(),
                        status: payload.status ?? chat.status,
                    }
                    : chat))
                : [...current, {
                    id: payload.supportChatId,
                    status: payload.status ?? 'pending',
                    messagesCount: 1,
                    updatedAt: payload.createdAt ?? new Date().toISOString(),
                    user: { name: payload.user?.name ?? 'Customer', email: payload.user?.email ?? '' },
                    lastMessage: payload.message,
                }];

            return [...updated].sort((a, b) => ((new Date(b.updatedAt ?? 0).getTime()) - (new Date(a.updatedAt ?? 0).getTime())));
        });

        setCurrentChat((current) => {
            if (!current || current.id !== payload.supportChatId) {
                return current;
            }

            if (current.messages.some((message) => message.id === payload.id)) {
                return current;
            }

            const incoming: ChatMessage = {
                id: payload.id,
                message: payload.message,
                createdAt: payload.createdAt,
                isAdmin: payload.isAdmin,
                sender: payload.sender,
                imageUrls: payload.imageUrls,
            };

            return {
                ...current,
                status: payload.status ?? current.status,
                messages: [...current.messages, incoming],
            };
        });
    }, []);

    const applyStatus = useCallback((payload: ChatStatusPayload) => {
        setChats((current) => {
            const exists = current.some((chat) => chat.id === payload.chatId);
            const updated = exists
                ? current.map((chat) => (chat.id === payload.chatId
                    ? {
                        ...chat,
                        status: payload.status ?? chat.status,
                        lastMessage: payload.lastMessage ?? chat.lastMessage,
                        updatedAt: payload.updatedAt ?? chat.updatedAt,
                    }
                    : chat))
                : [...current, {
                    id: payload.chatId,
                    status: payload.status ?? 'pending',
                    messagesCount: 0,
                    updatedAt: payload.updatedAt ?? new Date().toISOString(),
                    user: { name: payload.user?.name ?? 'Customer', email: payload.user?.email ?? '' },
                    lastMessage: payload.lastMessage ?? null,
                }];

            return [...updated].sort((a, b) => ((new Date(b.updatedAt ?? 0).getTime()) - (new Date(a.updatedAt ?? 0).getTime())));
        });

        setCurrentChat((current) => (
            current && current.id === payload.chatId && payload.status
                ? { ...current, status: payload.status }
                : current
        ));
    }, []);

    const handleBroadcast = useCallback((payload: ChatBroadcastPayload | ChatStatusPayload) => {
        if ('message' in payload) {
            applyMessage(payload);
        } else {
            applyStatus(payload);
        }
    }, [applyMessage, applyStatus]);

    useEcho<ChatBroadcastPayload | ChatStatusPayload>('admin.chat', ['.MessageSent', '.ChatStatusChanged'], handleBroadcast);

    function handleThreadMessage(message: ChatMessage) {
        if (!currentChat) {
            return;
        }

        applyMessage({
            ...message,
            supportChatId: currentChat.id,
            status: 'open',
        });
    }

    function handleThreadClosed(): void {
        if (!currentChat) {
            return;
        }

        applyStatus({ chatId: currentChat.id, status: 'close', updatedAt: new Date().toISOString() });
    }

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

Index.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
