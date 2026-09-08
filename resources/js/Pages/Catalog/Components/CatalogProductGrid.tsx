import type { CatalogProduct } from './CatalogTypes';
import { CatalogProductCard } from './CatalogProductCard';

export function CatalogProductGrid({ products }: { products: CatalogProduct[] }) {
    if (products.length === 0) {
        return <div className="border border-dashed border-stone-300 py-20 text-center text-sm text-stone-500">No pieces match these filters. Try clearing one or more selections.</div>;
    }

    return <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:gap-x-7">{products.map((product) => <CatalogProductCard key={product.id} product={product} />)}</div>;
}
