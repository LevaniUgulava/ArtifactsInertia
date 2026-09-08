import { Link } from '@inertiajs/react';
import productRoutes from '@/routes/product';
import type { CatalogProduct } from './CatalogTypes';

export function CatalogProductCard({ product }: { product: CatalogProduct }) {
    return (
        <article className="group min-w-0">
            <Link aria-label={`View ${product.name}`} className="block" href={productRoutes.show.url({ lang: 'en', product: product.id })}>
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img alt={product.name} className="size-full object-cover transition duration-500 group-hover:scale-[1.03]" loading="lazy" src={product.image} />
                {product.badge ? <span className="absolute left-3 top-3 text-[9px] font-semibold uppercase tracking-widest text-white">{product.badge}</span> : null}
            </div>
            <div className="space-y-1.5 pt-3">
                <h2 className="truncate text-xs font-semibold text-stone-950">{product.name}</h2>
                <p className="text-[10px] text-stone-500">{product.category} · {product.collection}</p>
                <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold text-stone-950">{product.price}</p>
                    <div aria-label={`Available colors for ${product.name}`} className="flex gap-1">
                        {product.colors.map((color) => <span aria-hidden="true" className="size-2 rounded-full border border-black/10" key={color} style={{ backgroundColor: color }} />)}
                    </div>
                </div>
            </div>
            </Link>
        </article>
    );
}
