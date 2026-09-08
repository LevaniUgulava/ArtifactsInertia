import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type CatalogPaginationProps = {
    currentPage: number;
    lastPage: number;
    onNavigate: (page: number) => void;
};

export function CatalogPagination({ currentPage, lastPage, onNavigate }: CatalogPaginationProps) {
    const { t } = useTranslation('catalog');
    const pages = Array.from(new Set([1, 2, 3, 4, lastPage].filter((page) => page <= lastPage)));

    return (
        <nav aria-label={t('paginationLabel')} className="flex items-center justify-center gap-1.5">
            <button aria-label={t('previousPage')} className="grid size-7 place-items-center border border-stone-200 text-stone-500 transition hover:border-stone-500 disabled:cursor-not-allowed disabled:opacity-40" disabled={currentPage === 1} onClick={() => onNavigate(currentPage - 1)} type="button">
                <ChevronLeftIcon aria-hidden="true" size={14} />
            </button>
            {pages.map((page) => (
                <button aria-current={currentPage === page ? 'page' : undefined} className={`size-7 text-xs transition ${currentPage === page ? 'bg-[#b58a52] text-white' : 'border border-stone-200 text-stone-600 hover:border-stone-500'}`} key={page} onClick={() => onNavigate(page)} type="button">
                    {page}
                </button>
            ))}
            <button aria-label={t('nextPage')} className="grid size-7 place-items-center border border-stone-200 text-stone-500 transition hover:border-stone-500 disabled:cursor-not-allowed disabled:opacity-40" disabled={currentPage === lastPage} onClick={() => onNavigate(currentPage + 1)} type="button">
                <ChevronRightIcon aria-hidden="true" size={14} />
            </button>
        </nav>
    );
}
