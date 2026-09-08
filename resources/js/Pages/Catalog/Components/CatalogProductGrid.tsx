import { useTranslation } from 'react-i18next';
import type { CatalogProduct } from './CatalogTypes';
import { CatalogProductCard } from './CatalogProductCard';

export function CatalogProductGrid({ products }: { products: CatalogProduct[] }) {
    const { t } = useTranslation('common');

    if (products.length === 0) {
        return <div className="border border-dashed border-stone-300 py-20 text-center text-sm text-stone-500">{t('noResults')}</div>;
    }

    return <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:gap-x-7">{products.map((product) => <CatalogProductCard key={product.id} product={product} />)}</div>;
}
