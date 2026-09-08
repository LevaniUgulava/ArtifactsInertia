import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { catalog, home } from '@/routes';

export function ProductBreadcrumb({ category, name }: { category: string; name: string }) {
    const { t } = useTranslation('common');
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';

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
