import { USER_AVATAR_IMAGE } from '@/constants/images';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/ui/popover';
import { ImagePlusIcon, SendIcon, XIcon } from 'lucide-react';
import { type ChangeEvent, type FormEvent, type ReactElement, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type ChatMessage = {
    id: number;
    role: 'operator' | 'user';
    message: string;
    time: string;
    imageUrls?: string[];
};

interface ChatWrapperProps {
    children: ReactElement;
}

function ChatWrapper({ children }: ChatWrapperProps) {
    const { t } = useTranslation('common');
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<{ previewUrl: string; fileName: string } | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const objectUrlsRef = useRef<string[]>([]);

    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            role: 'operator',
            message: t('supportChatGreeting'),
            time: '10:24',
        },
        {
            id: 2,
            role: 'operator',
            message: t('supportChatOperatorReply'),
            time: '10:24',
        },
    ]);

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

        if (!trimmedMessage && !selectedImage) {
            return;
        }

        setMessages((currentMessages) => [
            ...currentMessages,
            {
                id: Date.now(),
                role: 'user',
                message: trimmedMessage,
                time: t('supportChatNow'),
                imageUrls: selectedImage ? [selectedImage.previewUrl] : undefined,
            },
        ]);
        setMessage('');
        setSelectedImage(null);
    }

    return (
        <Popover>
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
                            <p className="mt-1 truncate text-[11px] text-brand-stone/65">{t('supportChatStatus')}</p>
                        </div>
                    </div>
                    <span aria-hidden="true" className="size-2 rounded-full bg-emerald-400" />
                </div>

                <div className="flex max-h-72 min-h-56 flex-col gap-3 overflow-y-auto wrap-break-word px-4 py-4" ref={messagesContainerRef}>
                    {messages.map((chatMessage) => (
                        <div
                            className={`flex items-end gap-2 ${chatMessage.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            key={chatMessage.id}
                        >
                            {chatMessage.role === 'operator' ? (
                                <img
                                    alt=""
                                    className="size-6 shrink-0 rounded-full object-cover"
                                    src={USER_AVATAR_IMAGE}
                                />
                            ) : null}
                            <div
                                className={`min-w-0 max-w-[85%] rounded-2xl ${chatMessage.imageUrls?.length && !chatMessage.message ? 'bg-transparent p-0' : `px-3 py-2.5 ${chatMessage.role === 'user' ? 'rounded-br-md bg-brand-charcoal text-brand-stone' : 'rounded-bl-md border border-brand-taupe/35 bg-brand-taupe/15 text-brand-charcoal'}`}`}
                            >
                                {chatMessage.role === 'operator' ? (
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
                                <p className={`mt-1 text-[10px] ${chatMessage.role === 'user' ? 'text-brand-stone/55' : 'text-brand-olive/55'}`}>
                                    {chatMessage.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <form className="bg-white p-3" onSubmit={handleSubmit}>
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
                            disabled={!message.trim() && !selectedImage}
                            type="submit"
                        >
                            <SendIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                        </button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}

export default ChatWrapper;
