import { usePage } from '@inertiajs/react';
import type { SharedPageProps } from '@/types/shared';

export function useLanguageSwitcher() {
    const { props, url } = usePage<SharedPageProps>();
    const currentLocale = props.locale ?? 'ka';
    const availableLocales = props.availableLocales ?? ['en', 'ka'];

    const [path, query = ''] = url.replace(/^https?:\/\/[^/]+/, '').split('?');
    const suffix = path.split('/').filter(Boolean).slice(1).join('/');

    function localeHref(locale: string): string {
        return `/${locale}${suffix ? `/${suffix}` : ''}${query ? `?${query}` : ''}`;
    }

    return { currentLocale, availableLocales, localeHref };
}