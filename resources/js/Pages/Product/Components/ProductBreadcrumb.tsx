import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/hooks/useLocale';
import type { ProductBreadcrumbProps } from '@/Pages/Product/ProductTypes';
import { catalog, home } from '@/routes';

export function ProductBreadcrumb({ category, name }: ProductBreadcrumbProps) {
    const { t } = useTranslation('common');
    const lang = useLocale();

    return (
        <nav aria-label={t('breadcrumb')} className="flex flex-wrap items-center gap-2 text-[10px] text-stone-500">
            <Link className="transition hover:text-stone-950" href={home.url({ lang })}>{t('home')}</Link>
            <span aria-hidden="true">/</span>
            <Link className="transition hover:text-stone-950" href={catalog.url({ lang })}>{category}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-stone-950">{name}</span>
        </nav>
    );
}