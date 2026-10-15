import { useHttp, usePage } from '@inertiajs/react';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatBroadcastPayload, ChatMessage, ChatStatusPayload, SelectedChat } from '@/Pages/Admin/Chat/ChatTypes';
import chat from '@/routes/chat';
import type { SelectedImage } from '@/types/components';
import type { SharedPageProps } from '@/types/shared';

export function useChat() {
    const { t } = useTranslation('common');
    const { auth } = usePage<SharedPageProps>().props;

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'guest' | 'error'>('idle');
    const [chatId, setChatId] = useState<string | null>(null);
    const [chatStatus, setChatStatus] = useState<string>('pending');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
    const [sendFailed, setSendFailed] = useState(false);
    const [closeModalOpen, setCloseModalOpen] = useState(false);

    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const objectUrlsRef = useRef<string[]>([]);
    const http = useHttp<{ chatId: string; message: string }>({ chatId: '', message: '' });

    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
        };
    }, []);

    useEffect(() => {
        const messagesContainer = messagesContainerRef.current;

        if (!messagesContainer) {
            return;
        }

        messagesContainer.scrollTo({
            behavior: 'smooth',
            top: messagesContainer.scrollHeight,
        });
    }, [messages]);

    useEffect(() => {
        if (open && status === 'idle') {
            if (!auth.user) {
                setStatus('guest');

                return;
            }

            setStatus('loading');
            http.post(chat.open.url(), {
                onSuccess: (payload) => {
                    const data = payload as SelectedChat;

                    setChatId(data.id);
                    setChatStatus(data.status);
                    setMessages(data.messages);
                    setStatus('ready');
                },
                onError: () => setStatus('error'),
            });
        }
    }, [open, status, auth.user, http]);

    const appendMessage = useCallback((incoming: ChatMessage) => {
        setMessages((current) => {
            if (current.some((item) => item.id === incoming.id)) {
                return current;
            }

            const optimisticIndex = current.findIndex((item) => item.id < 0 && !item.isAdmin && item.message === incoming.message);

            if (optimisticIndex !== -1) {
                return current.map((item, index) => index === optimisticIndex ? incoming : item);
            }

            return [...current, incoming];
        });
    }, []);

    const handleBroadcast = useCallback((payload: ChatBroadcastPayload | ChatStatusPayload) => {
        if ('message' in payload) {
            appendMessage({
                id: payload.id,
                message: payload.message,
                createdAt: payload.createdAt,
                isAdmin: payload.isAdmin,
                sender: payload.sender,
                imageUrls: payload.imageUrls,
            });
        }

        if (payload.status) {
            setChatStatus(payload.status);
        }
    }, [appendMessage]);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];

        if (!file || !file.type.startsWith('image/')) {
            return;
        }

        if (selectedImage) {
            URL.revokeObjectURL(selectedImage.previewUrl);
            objectUrlsRef.current = objectUrlsRef.current.filter((objectUrl) => objectUrl !== selectedImage.previewUrl);
        }

        const previewUrl = URL.createObjectURL(file);

        objectUrlsRef.current.push(previewUrl);
        setSelectedImage({ fileName: file.name, previewUrl });
        event.target.value = '';
    }

    function removeSelectedImage(): void {
        if (!selectedImage) {
            return;
        }

        URL.revokeObjectURL(selectedImage.previewUrl);
        objectUrlsRef.current = objectUrlsRef.current.filter((objectUrl) => objectUrl !== selectedImage.previewUrl);
        setSelectedImage(null);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const trimmedMessage = message.trim();

        if (!chatId || !trimmedMessage || http.processing) {
            return;
        }

        const optimistic: ChatMessage = {
            id: -Date.now(),
            message: trimmedMessage,
            createdAt: new Date().toISOString(),
            isAdmin: false,
            sender: auth.user?.name ?? null,
            imageUrls: selectedImage ? [selectedImage.previewUrl] : undefined,
        };

        setMessages((current) => [...current, optimistic]);
        setMessage('');
        setSelectedImage(null);
        setSendFailed(false);
        http.setData({ chatId, message: trimmedMessage });

        http.post(chat.message.url(), {
            onSuccess: (payload) => {
                const created = (payload as { message?: ChatMessage }).message;

                if (created) {
                    setMessages((current) => {
                        if (current.some((item) => item.id === created.id)) {
                            return current.filter((item) => item.id !== optimistic.id);
                        }

                        return current.map((item) => (item.id === optimistic.id ? created : item));
                    });
                }

                setChatStatus('open');
            },
            onError: () => {
                setMessages((current) => current.filter((item) => item.id !== optimistic.id));
                setMessage(trimmedMessage);
                setSendFailed(true);
            },
        });
    }

    function closeConversation(): void {
        if (!chatId || http.processing) {
            return;
        }

        http.post(chat.close({ chat: chatId }).url, {
            onSuccess: () => {
                setChatStatus('close');
                setMessage('');
                setSelectedImage(null);
                setCloseModalOpen(false);
            },
        });
    }

    const requestClose = useCallback(() => setCloseModalOpen(true), []);
    const dismissClose = useCallback(() => setCloseModalOpen(false), []);

    const greetingMessages: ChatMessage[] = [
        {
            id: -2,
            message: t('supportChatGreeting'),
            createdAt: null,
            isAdmin: true,
            sender: null,
        },
        {
            id: -1,
            message: t('supportChatOperatorReply'),
            createdAt: null,
            isAdmin: true,
            sender: null,
        },
    ];

    const chatStateLabel = chatStatus === 'open' ? t('supportChatOnline') : chatStatus === 'close' ? t('supportChatClosed') : t('supportChatWaiting');
    const chatStateDot = chatStatus === 'open' ? 'bg-emerald-400' : chatStatus === 'close' ? 'bg-slate-400' : 'bg-amber-400';
    const chatStateDotLabel = chatStatus === 'open' ? t('supportChatOnline') : chatStatus === 'close' ? t('supportChatClosed') : t('supportChatWaiting');
    const closable = chatStatus !== 'close';

    return {
        open,
        setOpen,
        status,
        chatId,
        chatStatus,
        messages,
        message,
        selectedImage,
        sendFailed,
        closeModalOpen,
        messagesContainerRef,
        http,
        greetingMessages,
        chatStateLabel,
        chatStateDot,
        chatStateDotLabel,
        closable,
        setMessage,
        handleBroadcast,
        handleImageChange,
        removeSelectedImage,
        handleSubmit,
        requestClose,
        dismissClose,
        closeConversation,
    };
}