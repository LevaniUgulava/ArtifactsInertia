import { useTranslation } from 'react-i18next';
import { useLanguageSwitcher } from '@/Components/hooks/useLanguageSwitcher';
import type { LanguageSwitcherProps } from '@/types/components';

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
    const { t } = useTranslation('profile');
    const { currentLocale, availableLocales, localeHref } = useLanguageSwitcher();

    return (
        <div>
            <span className="mb-2 block text-[10px] font-bold tracking-wide text-stone-500">{t('language')}</span>
            <div className={`flex items-center gap-1 text-[10px] font-bold ${className}`}>
                {availableLocales.map((locale) => (
                    <a
                        className={`rounded px-2.5 py-1 transition ${locale === currentLocale ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'}`}
                        href={localeHref(locale)}
                        key={locale}
                    >
                        {locale.toUpperCase()}
                    </a>
                ))}
            </div>
        </div>
    );
}