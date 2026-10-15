import { useTranslation } from 'react-i18next';
import { USER_AVATAR_IMAGE } from '@/constants/images';
import { toTime } from '@/Components/ChatWrapper/utils';
import type { ChatMessageBubbleProps } from '@/types/components';

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
    const { t } = useTranslation('common');

    return (
        <div className={`flex items-end gap-2 ${message.isAdmin ? 'justify-start' : 'justify-end'}`}>
            {message.isAdmin ? (
                <img alt="" className="size-6 shrink-0 rounded-full object-cover" src={USER_AVATAR_IMAGE} />
            ) : null}
            <div className={`min-w-0 max-w-[85%] rounded-2xl ${message.imageUrls?.length && !message.message ? 'bg-transparent p-0' : `px-3 py-2.5 ${message.isAdmin ? 'rounded-bl-md border border-brand-taupe/35 bg-brand-taupe/15 text-brand-charcoal' : 'rounded-br-md bg-brand-charcoal text-brand-stone'}`}`}>
                {message.isAdmin ? (
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-olive/65">
                        {t('supportChatOperator')}
                    </p>
                ) : null}
                {message.imageUrls?.[0] ? (
                    <a
                        aria-label={t('supportChatOpenImage')}
                        className="block cursor-zoom-in"
                        href={message.imageUrls[0]}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <img
                            alt={t('supportChatAttachedImage')}
                            className="max-h-48 max-w-full rounded-lg object-cover"
                            src={message.imageUrls[0]}
                        />
                    </a>
                ) : null}
                {message.message ? <p className="wrap-break-word text-xs leading-5">{message.message}</p> : null}
                <p className={`mt-1 text-[10px] ${message.isAdmin ? 'text-brand-olive/55' : 'text-brand-stone/55'}`}>
                    {message.createdAt ? toTime(message.createdAt) : t('supportChatNow')}
                </p>
            </div>
        </div>
    );
}