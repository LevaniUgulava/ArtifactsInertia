import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { login } from '@/routes';

export function GuestPrompt() {
    const { t } = useTranslation('common');

    return (
        <div className="px-6 py-10 text-center">
            <p className="text-sm leading-6 text-brand-olive">{t('supportChatLoginPrompt')}</p>
            <Link
                className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg bg-brand-charcoal px-5 py-2.5 text-sm font-semibold text-brand-stone transition-opacity hover:opacity-90"
                href={login.url()}
            >
                {t('supportChatLogin')}
            </Link>
        </div>
    );
}