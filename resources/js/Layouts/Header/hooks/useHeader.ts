import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { HeaderPageProps } from '../types/HeaderTypes';

export function useHeader() {
    const { props } = usePage<HeaderPageProps>();
    const user = props.auth.user;
    const lang = props.locale ?? 'en';
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

    return {
        user,
        lang,
        isSearchOpen,
        searchQuery,
        isMobileAccountOpen,
        setIsMobileAccountOpen,
        openSearch,
        closeSearch,
    };
}
