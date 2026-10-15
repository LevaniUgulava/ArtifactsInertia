import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function useCollectionHeader(sort: string, onSortChange: (value: string) => void) {
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

    function toggleSort() {
        setIsSortOpen((open) => !open);
    }

    function selectSort(value: string) {
        onSortChange(value);
        setIsSortOpen(false);
    }

    return { isSortOpen, sortMenuRef, sortOptions, selectedSort, toggleSort, selectSort };
}