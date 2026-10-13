import { ArrowDownUpIcon, CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CollectionHeaderProps } from '../types/CatalogTypes';

export function CollectionHeader({ name, count, sort, onSortChange }: CollectionHeaderProps) {
    const { t } = useTranslation('catalog');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortMenuRef = useRef<HTMLSpanElement>(null);

    const sortOptions = [
        { label: t('newest'), value: 'newest' },
        { label: t('priceLowToHigh'), value: 'price-low' },
        { label: t('priceHighToLow'), value: 'price-high' },
    ];

    useEffect(() => {
        if (!isSortOpen) {
            return;
        }

        const closeOnOutsideClick = (event: MouseEvent) => {
            if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener('mousedown', closeOnOutsideClick);

        return () => document.removeEventListener('mousedown', closeOnOutsideClick);
    }, [isSortOpen]);

    const selectedSort = sortOptions.find((option) => option.value === sort) ?? sortOptions[0];

    return (
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">{name}</h1>
                <p className="mt-1 text-xs text-stone-500">{t('showingProducts', { count })}</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-stone-500">
                <span>{t('sortBy')}</span>
                <span className="relative" ref={sortMenuRef}>
                    <button
                        aria-expanded={isSortOpen}
                        aria-haspopup="listbox"
                        aria-label={t('sortBy')}
                        className="flex min-w-40 items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2 text-left text-xs text-stone-700 outline-none transition hover:border-stone-400 focus:border-amber-700 focus:ring-2 focus:ring-amber-700/15"
                        onClick={() => setIsSortOpen((open) => !open)}
                        type="button"
                    >
                        <span className="flex items-center gap-2">
                            <ArrowDownUpIcon aria-hidden="true" className="text-stone-400" size={13} />
                            {selectedSort.label}
                        </span>
                        <ChevronDownIcon aria-hidden="true" className={`text-stone-400 transition ${isSortOpen ? 'rotate-180' : ''}`} size={13} />
                    </button>
                    {isSortOpen ? (
                        <div className="absolute right-0 z-20 mt-2 min-w-full overflow-hidden rounded-lg border border-stone-200 bg-white p-1 shadow-lg" role="listbox">
                            {sortOptions.map((option) => (
                                <button
                                    aria-selected={option.value === sort}
                                    className="flex w-full items-center justify-between gap-4 rounded-md px-3 py-2 text-left text-xs text-stone-700 transition hover:bg-stone-50"
                                    key={option.value}
                                    onClick={() => {
                                        onSortChange(option.value);
                                        setIsSortOpen(false);
                                    }}
                                    role="option"
                                    type="button"
                                >
                                    {option.label}
                                    {option.value === sort ? <CheckIcon aria-hidden="true" className="text-amber-700" size={13} /> : null}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </span>
            </label>
        </div>
    );
}
