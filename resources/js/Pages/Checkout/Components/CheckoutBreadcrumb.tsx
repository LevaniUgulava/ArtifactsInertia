import { ChevronRightIcon } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { cart } from '@/routes';

export function CheckoutBreadcrumb() {
    const { t } = useTranslation('checkout');
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';

    return (
        <nav aria-label={t('breadcrumbLabel')} className="flex items-center gap-2 text-[10px] text-stone-500">
            <Link className="transition hover:text-stone-950" href={cart.url({ lang })}>{t('breadcrumbCart')}</Link>
            <ChevronRightIcon aria-hidden="true" size={12} />
            <span className="font-semibold text-stone-950">{t('breadcrumbCheckout')}</span>
        </nav>
    );
}
