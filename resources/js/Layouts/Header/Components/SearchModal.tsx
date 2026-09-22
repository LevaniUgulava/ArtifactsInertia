import { router } from '@inertiajs/react';
import { ArrowUpRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { catalog } from '@/routes';

type SearchModalProps = {
    initialQuery: string;
    lang: string;
    onClose: () => void;
};

const suggestionKeys = ['newArrivals', 'outerwear', 'essentials', 'gifts'] as const;

export function SearchModal({ initialQuery, lang, onClose }: SearchModalProps) {
    const { t } = useTranslation('header');
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

    return (
        <div aria-label={t('search')} aria-modal="true" className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-brand-charcoal/20 px-4 py-5 backdrop-blur-[2px] sm:px-6 sm:py-10" onMouseDown={(e) => e.target === e.currentTarget && onClose()} role="dialog">
            <div className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-xl border border-brand-charcoal/10 bg-brand-stone shadow-[0_1.5rem_4rem_rgba(11,11,11,0.18)] sm:max-h-[calc(100dvh-4rem)] sm:w-[70vw] sm:max-w-xl sm:rounded-2xl lg:w-1/2 lg:max-w-2xl lg:rounded-[1.5rem]">
                <div className="border-b border-brand-olive/15 p-2 sm:p-3.5 lg:p-4">
                    <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3">
                        <form className="flex min-h-9 min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-brand-olive/25 bg-white px-2.5 py-1 transition focus-within:border-brand-charcoal/50 focus-within:ring-4 focus-within:ring-brand-olive/10 sm:min-h-10 sm:gap-2 sm:rounded-xl sm:px-3 lg:min-h-11 lg:gap-2.5 lg:rounded-xl lg:px-3.5 lg:py-1.5" onSubmit={submitSearch} role="search">
                            <SearchIcon aria-hidden="true" className="shrink-0 text-brand-olive/65" size={14} strokeWidth={1.8} />
                            <input
                                aria-label={t('search')}
                                className="min-w-0 flex-1 bg-transparent text-xs text-brand-charcoal outline-none placeholder:text-brand-olive/55 sm:text-sm"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t('searchPlaceholder')}
                                ref={inputRef}
                                type="search"
                                value={query}
                            />
                        </form>
                        <button aria-label={t('closeSearch')} className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-olive/25 bg-white text-brand-olive/75 transition hover:border-brand-charcoal/35 hover:bg-brand-charcoal hover:text-brand-stone sm:size-10 sm:rounded-xl lg:size-11" onClick={onClose} type="button">
                            <XIcon aria-hidden="true" size={14} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>

                <div className="space-y-4 px-3.5 py-4 sm:space-y-5 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
                    <div className="space-y-2 sm:space-y-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-olive/65">{t('suggestions')}</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                            {suggestionKeys.map((suggestionKey) => (
                                <button className="group inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-olive/20 bg-white px-3 py-1.5 text-left text-[11px] font-semibold text-brand-charcoal transition hover:border-brand-charcoal/40 hover:bg-brand-charcoal hover:text-brand-stone sm:min-h-10 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs" key={suggestionKey} onClick={() => setQuery(t(`suggestionItems.${suggestionKey}`))} type="button">
                                    {t(`suggestionItems.${suggestionKey}`)}
                                    <ArrowUpRightIcon aria-hidden="true" className="shrink-0 text-brand-olive/45 transition group-hover:text-brand-stone" size={13} strokeWidth={1.7} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-brand-olive/15 pt-4 text-[9px] uppercase tracking-[0.16em] text-brand-olive/55 sm:text-[10px] sm:tracking-[0.18em]">
                        <span>{t('searchSubmitHint')}</span>
                        <span>{t('searchCloseHint')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
