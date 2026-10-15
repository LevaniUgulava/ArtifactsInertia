import { Link } from '@inertiajs/react';
import { useLocale } from '@/hooks/useLocale';
import type { ProductGridProps } from '@/Pages/Home/HomeTypes';
import productRoutes from '@/routes/product';

export function ProductGrid({ products }: ProductGridProps) {
    const lang = useLocale();

    return (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-5 lg:gap-x-7 2xl:gap-x-10">
            {products.map((product) => (
                <Link className="group space-y-3" href={productRoutes.show.url({ lang, product: product.id })} key={product.id}>
                    <img alt={product.name} className="rounded-xl aspect-4/5 w-full object-cover transition duration-500 group-hover:scale-[1.02]" src={product.image} />
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-stone-900 sm:text-sm">{product.name}</h3>
                        <p className="text-xs text-stone-500">{product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}