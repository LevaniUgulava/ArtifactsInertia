import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

type LanguageSwitcherProps = {
    className?: string;
};

type SharedPageProps = {
    locale?: string;
    availableLocales?: string[];
};

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
    const { t } = useTranslation('profile');
    const { props, url } = usePage<SharedPageProps>();
    const currentLocale = props.locale ?? 'en';
    const availableLocales = props.availableLocales ?? ['en'];

    const [path, query = ''] = url.replace(/^https?:\/\/[^/]+/, '').split('?');
    const suffix = path.split('/').filter(Boolean).slice(1).join('/');

    return (
        <div>
            <span className="mb-2 block text-[10px] font-bold tracking-wide text-stone-500">{t('language')}</span>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${className}`}>
                {availableLocales.map((locale) => (
                    <a
                        className={`rounded px-2.5 py-1 transition ${locale === currentLocale ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'}`}
                        href={`/${locale}${suffix ? `/${suffix}` : ''}${query ? `?${query}` : ''}`}
                        key={locale}
                    >
                        {locale.toUpperCase()}
                    </a>
                ))}
            </div>
        </div>
    );
}
