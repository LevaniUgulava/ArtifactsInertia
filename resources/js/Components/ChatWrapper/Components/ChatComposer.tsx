import { ImagePlusIcon, SendIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ChatComposerProps } from '@/types/components';

export function ChatComposer({ message, onMessageChange, selectedImage, onImageChange, onRemoveImage, onSubmit, hasChat, processing }: ChatComposerProps) {
    const { t } = useTranslation('common');

    return (
        <form className="bg-white p-3" onSubmit={onSubmit}>
            {selectedImage ? (
                <div className="mb-2 flex items-center gap-2 rounded-lg bg-brand-stone p-2">
                    <img alt="" className="size-10 rounded-md object-cover" src={selectedImage.previewUrl} />
                    <span className="min-w-0 flex-1 truncate text-[11px] text-brand-olive">{selectedImage.fileName}</span>
                    <button
                        aria-label={t('supportChatRemoveImage')}
                        className="grid size-7 shrink-0 cursor-pointer place-items-center rounded-md text-brand-olive hover:bg-brand-olive/10"
                        onClick={onRemoveImage}
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
                    onChange={onImageChange}
                    type="file"
                />
                <input
                    aria-label={t('supportChatPlaceholder')}
                    className="h-10 min-w-0 flex-1 rounded-lg border border-brand-olive/20 bg-brand-stone px-3.5 text-xs text-brand-charcoal outline-none placeholder:text-brand-olive/55 focus:ring-0"
                    onChange={(event) => onMessageChange(event.target.value)}
                    placeholder={t('supportChatPlaceholder')}
                    type="text"
                    value={message}
                />
                <button
                    aria-label={t('sendMessage')}
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-brand-charcoal text-brand-stone transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
                    disabled={!hasChat || (!message.trim() && !selectedImage) || processing}
                    type="submit"
                >
                    <SendIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                </button>
            </div>
        </form>
    );
}