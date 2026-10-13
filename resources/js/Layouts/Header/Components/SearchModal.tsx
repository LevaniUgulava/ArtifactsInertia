import { ArrowUpRightIcon, SearchIcon, XIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { suggestionKeys } from '../constants/searchSuggestions';
import type { SearchModalProps } from '../types/HeaderTypes';
import { useSearchModal } from '../hooks/useSearchModal';

export function SearchModal({ initialQuery, lang, onClose }: SearchModalProps) {
    const { t } = useTranslation('header');
    const { query, setQuery, inputRef, submitSearch, handleKeyDown } = useSearchModal(initialQuery, lang, onClose);

    return (
        <div aria-label={t('search')} aria-modal="true" className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-brand-charcoal/30 px-4 py-5 backdrop-blur-[3px] sm:px-6 sm:py-12" onMouseDown={(e) => e.target === e.currentTarget && onClose()} role="dialog">
            <div className="max-h-[calc(100dvh-2.5rem)] w-full max-w-md overflow-y-auto rounded-[1.5rem] border border-white/70 bg-brand-stone shadow-[0_1.75rem_5rem_rgba(11,11,11,0.22)] sm:max-h-[calc(100dvh-6rem)] sm:w-[70vw] sm:max-w-xl lg:w-1/2 lg:max-w-2xl">
                <div className="border-b border-brand-olive/15 px-4 py-4 sm:px-6 sm:py-5 lg:px-7">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <form className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-brand-olive/20 bg-white px-3.5 py-1.5 shadow-sm transition focus-within:border-brand-charcoal/45 focus-within:ring-4 focus-within:ring-brand-olive/10 sm:min-h-12 sm:rounded-2xl sm:px-4" onSubmit={submitSearch} role="search">
                            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-stone text-brand-olive/70">
                                <SearchIcon aria-hidden="true" size={14} strokeWidth={1.8} />
                            </span>
                            <input
                                aria-label={t('search')}
                                className="min-w-0 flex-1 bg-transparent text-sm text-brand-charcoal outline-none placeholder:text-brand-olive/55"
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t('searchPlaceholder')}
                                ref={inputRef}
                                type="search"
                                value={query}
                            />
                        </form>
                        <button aria-label={t('closeSearch')} className="grid size-11 shrink-0 place-items-center rounded-full border border-brand-olive/20 bg-white text-brand-olive/75 transition hover:border-brand-charcoal hover:bg-brand-charcoal hover:text-brand-stone" onClick={onClose} type="button">
                            <XIcon aria-hidden="true" size={15} strokeWidth={1.8} />
                        </button>
                    </div>
                </div>

                <div className="space-y-4 bg-white/25 px-5 py-5 sm:space-y-5 sm:px-7 sm:py-6">
                    <div className="space-y-3">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-olive/65">{t('suggestions')}</p>
                        <div className="flex flex-wrap gap-2">
                            {suggestionKeys.map((suggestionKey) => (
                                <button className="group inline-flex min-h-10 items-center gap-2 rounded-full border border-brand-olive/15 bg-brand-stone px-3.5 py-2 text-left text-xs font-semibold text-brand-charcoal transition hover:border-brand-charcoal/35 hover:bg-brand-charcoal hover:text-brand-stone" key={suggestionKey} onClick={() => setQuery(t(`suggestionItems.${suggestionKey}`))} type="button">
                                    {t(`suggestionItems.${suggestionKey}`)}
                                    <ArrowUpRightIcon aria-hidden="true" className="shrink-0 text-brand-olive/45 transition group-hover:text-brand-stone" size={13} strokeWidth={1.7} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
