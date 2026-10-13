import { useEcho } from '@laravel/echo-react';
import { Link, useHttp, usePage } from '@inertiajs/react';
import { ImagePlusIcon, SendIcon, XIcon } from 'lucide-react';
import { type ChangeEvent, type FormEvent, type ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ConfirmationModal } from '@/Components/ui/ConfirmationModal';
import { USER_AVATAR_IMAGE } from '@/constants/images';
import type { ChatBroadcastPayload, ChatMessage, ChatStatusPayload, SelectedChat } from '@/Pages/Admin/Chat/ChatTypes';
import { login } from '@/routes';
import chat from '@/routes/chat';

type AuthUser = { id: number; name: string };

type ChatWrapperProps = {
    children: ReactElement;
};

function toTime(iso: string | null): string {
    if (!iso) {
        return '';
    }

    const date = new Date(iso);
    const now = new Date();

    const sameDay = date.toDateString() === now.toDateString();

    if (sameDay) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return date.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
}

function ChatLive({
    chatId,
    onMessage,
}: {
    chatId: string;
    onMessage: (payload: ChatBroadcastPayload | ChatStatusPayload) => void;
}) {
    useEcho<ChatBroadcastPayload | ChatStatusPayload>(`chat.${chatId}`, ['.MessageSent', '.ChatStatusChanged'], onMessage, [chatId, onMessage]);

    return null;
}

function ChatWrapper({ children }: ChatWrapperProps) {
    const { t } = useTranslation('common');
    const { auth } = usePage<{ auth: { user: AuthUser | null } }>().props;

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'guest' | 'error'>('idle');
    const [chatId, setChatId] = useState<string | null>(null);
    const [chatStatus, setChatStatus] = useState<string>('pending');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<{ previewUrl: string; fileName: string } | null>(null);
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

    return (
        <>
            <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger render={children} />
            <PopoverContent
                align="end"
                className="w-[min(calc(100vw-2rem),24rem)] overflow-hidden rounded-2xl border-0 bg-brand-stone p-0 text-brand-charcoal shadow-[0_1.5rem_4rem_rgba(11,11,11,0.2)] ring-0"
                positionMethod="fixed"
                side="top"
                sideOffset={12}
            >
                <div className="flex items-center justify-between bg-brand-charcoal px-4 py-4 text-brand-stone">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex shrink-0 -space-x-2">
                            <img alt="" className="size-9 rounded-full border-2 border-brand-charcoal object-cover" src={USER_AVATAR_IMAGE} />
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">{t('supportChatTitle')}</p>
                            <p className="mt-1 truncate text-[11px] text-brand-stone/65">{chatStateLabel}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {chatStatus !== 'close' ? <button aria-label={t('supportChatClose')} className="grid size-7 place-items-center rounded-full text-brand-stone/65 transition hover:bg-brand-stone/10 hover:text-brand-stone disabled:cursor-not-allowed disabled:opacity-50" disabled={http.processing} onClick={() => setCloseModalOpen(true)} title={t('supportChatClose')} type="button"><XIcon aria-hidden="true" size={15} /></button> : null}
                        <span aria-label={chatStateDotLabel} className={`size-2 rounded-full ${chatStateDot}`} />
                    </div>
                </div>

                {status === 'guest' ? (
                    <div className="px-6 py-10 text-center">
                        <p className="text-sm leading-6 text-brand-olive">{t('supportChatLoginPrompt')}</p>
                        <Link
                            className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand-charcoal px-5 py-2.5 text-sm font-semibold text-brand-stone transition-opacity hover:opacity-90"
                            href={login.url()}
                        >
                            {t('supportChatLogin')}
                        </Link>
                    </div>
                ) : status === 'loading' ? (
                    <div className="px-6 py-10 text-center text-sm text-brand-olive/70">{t('supportChatLoading')}</div>
                ) : status === 'error' ? (
                    <div className="px-6 py-10 text-center text-sm text-red-600">{t('supportChatError')}</div>
                ) : (
                    <>
                        {chatId ? <ChatLive chatId={chatId} onMessage={handleBroadcast} /> : null}

                        <div className="flex max-h-72 min-h-56 flex-col gap-3 overflow-y-auto wrap-break-word px-4 py-4" ref={messagesContainerRef}>
                            {[...greetingMessages, ...messages].map((chatMessage) => (
                                <div
                                    className={`flex items-end gap-2 ${chatMessage.isAdmin ? 'justify-start' : 'justify-end'}`}
                                    key={chatMessage.id}
                                >
                                    {chatMessage.isAdmin ? (
                                        <img
                                            alt=""
                                            className="size-6 shrink-0 rounded-full object-cover"
                                            src={USER_AVATAR_IMAGE}
                                        />
                                    ) : null}
                                    <div
                                        className={`min-w-0 max-w-[85%] rounded-2xl ${chatMessage.imageUrls?.length && !chatMessage.message ? 'bg-transparent p-0' : `px-3 py-2.5 ${chatMessage.isAdmin ? 'rounded-bl-md border border-brand-taupe/35 bg-brand-taupe/15 text-brand-charcoal' : 'rounded-br-md bg-brand-charcoal text-brand-stone'}`}`}
                                    >
                                        {chatMessage.isAdmin ? (
                                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-olive/65">
                                                {t('supportChatOperator')}
                                            </p>
                                        ) : null}
                                        {chatMessage.imageUrls?.[0] ? (
                                            <a
                                                aria-label={t('supportChatOpenImage')}
                                                className="block cursor-zoom-in"
                                                href={chatMessage.imageUrls[0]}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                <img
                                                    alt={t('supportChatAttachedImage')}
                                                    className="max-h-48 max-w-full rounded-lg object-cover"
                                                    src={chatMessage.imageUrls[0]}
                                                />
                                            </a>
                                        ) : null}
                                        {chatMessage.message ? <p className="wrap-break-word text-xs leading-5">{chatMessage.message}</p> : null}
                                        <p className={`mt-1 text-[10px] ${chatMessage.isAdmin ? 'text-brand-olive/55' : 'text-brand-stone/55'}`}>
                                            {chatMessage.createdAt ? toTime(chatMessage.createdAt) : t('supportChatNow')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {sendFailed ? <p className="px-4 pb-1 text-center text-[11px] text-red-600">{t('supportChatSendError')}</p> : null}

                        {chatStatus === 'close' ? <p className="border-t border-brand-taupe/20 bg-white px-4 py-3 text-center text-[11px] text-brand-olive">{t('supportChatClosed')}</p> : null}

                        {chatStatus !== 'close' ? <form className="bg-white p-3" onSubmit={handleSubmit}>
                            {selectedImage ? (
                                <div className="mb-2 flex items-center gap-2 rounded-lg bg-brand-stone p-2">
                                    <img alt="" className="size-10 rounded-md object-cover" src={selectedImage.previewUrl} />
                                    <span className="min-w-0 flex-1 truncate text-[11px] text-brand-olive">{selectedImage.fileName}</span>
                                    <button
                                        aria-label={t('supportChatRemoveImage')}
                                        className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md text-brand-olive hover:bg-brand-olive/10"
                                        onClick={removeSelectedImage}
                                        type="button"
                                    >
                                        <XIcon aria-hidden="true" size={14} />
                                    </button>
                                </div>
                            ) : null}
                            <div className="flex items-center gap-2">
                                <label
                                    className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-lg text-brand-olive transition-colors hover:bg-brand-stone"
                                    htmlFor="support-chat-image"
                                    title={t('supportChatAttachImage')}
                                >
                                    <ImagePlusIcon aria-hidden="true" size={17} strokeWidth={1.8} />
                                    <span className="sr-only">{t('supportChatAttachImage')}</span>
                                </label>
                                <input
                                    accept="image/*"
                                    className="sr-only"
                                    id="support-chat-image"
                                    onChange={handleImageChange}
                                    type="file"
                                />
                                <input
                                    aria-label={t('supportChatPlaceholder')}
                                    className="h-10 min-w-0 flex-1 rounded-lg border border-brand-olive/20 bg-brand-stone px-3.5 text-xs text-brand-charcoal outline-none placeholder:text-brand-olive/55 focus:ring-0"
                                    onChange={(event) => setMessage(event.target.value)}
                                    placeholder={t('supportChatPlaceholder')}
                                    type="text"
                                    value={message}
                                />
                                <button
                                    aria-label={t('sendMessage')}
                                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-brand-charcoal text-brand-stone transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                                    disabled={!chatId || (!message.trim() && !selectedImage) || http.processing}
                                    type="submit"
                                >
                                    <SendIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                                </button>
                            </div>
                        </form> : null}

                    </>
                )}
            </PopoverContent>
            </Popover>
            <ConfirmationModal
            cancelLabel={t('cancel')}
            confirmLabel={t('supportChatClose')}
            description={t('supportChatCloseConfirm')}
            onCancel={() => setCloseModalOpen(false)}
            onConfirm={closeConversation}
            open={closeModalOpen}
            processing={http.processing}
            title={t('supportChatCloseTitle')}
            />
        </>
    );
}

export default ChatWrapper;
