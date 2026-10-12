import { MessageCircleIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

export function SupportChatButton({ className = '', ...props }: ComponentProps<'button'>) {
    const { t } = useTranslation('common');

    return (
        <button
            {...props}
            aria-label={t('openSupportChat')}
            className={`fixed bottom-5 right-5 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-brand-charcoal text-brand-stone shadow-[0_0.75rem_2rem_rgba(11,11,11,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-charcoal sm:bottom-6 sm:right-6 ${className}`}
            type="button"
        >
            <MessageCircleIcon aria-hidden="true" size={22} strokeWidth={1.8} />
        </button>
    );
}
