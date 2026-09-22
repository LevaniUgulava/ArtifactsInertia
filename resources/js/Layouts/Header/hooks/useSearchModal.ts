import { router } from '@inertiajs/react';
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { catalog } from '@/routes';

export function useSearchModal(initialQuery: string, lang: string, onClose: () => void) {
    const [query, setQuery] = useState(initialQuery);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    const submitSearch = (e: FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();

        router.get(catalog.url({ lang }, { query: trimmedQuery ? { q: trimmedQuery } : {} }), {}, { preserveScroll: true });
        onClose();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return {
        query,
        setQuery,
        inputRef,
        submitSearch,
        handleKeyDown,
    };
}
