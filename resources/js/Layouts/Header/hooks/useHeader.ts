import { router, usePage } from '@inertiajs/react';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { HeaderPageProps } from '../HeaderTypes';

export function useHeader() {
    const { props, url } = usePage<HeaderPageProps>();
    const user = props.auth.user;
    const lang = props.locale ?? 'en';
    const availableLocales = props.availableLocales ?? ['en'];
    const activeSearch = props.catalog?.search ?? '';

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(activeSearch);
    const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);

    useEffect(() => {
        if (!isMobileAccountOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMobileAccountOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [isMobileAccountOpen]);

    const openSearch = () => {
        setSearchQuery(activeSearch);
        setIsSearchOpen(true);
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery(activeSearch);
    };

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const targetLocale = e.target.value;

        if (targetLocale === lang) {
            return;
        }

        const [path, query = ''] = url.replace(/^https?:\/\/[^/]+/, '').split('?');
        const segments = path.split('/').filter(Boolean);

        if (segments[0] === lang) {
            segments[0] = targetLocale;
        } else {
            segments.unshift(targetLocale);
        }

        router.visit(`/${segments.join('/')}${query ? `?${query}` : ''}`, { preserveScroll: true });
    };

    return {
        user,
        lang,
        availableLocales,
        isSearchOpen,
        searchQuery,
        isMobileAccountOpen,
        setIsMobileAccountOpen,
        openSearch,
        closeSearch,
        handleLanguageChange,
    };
}
