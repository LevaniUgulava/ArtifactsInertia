export type Product = {
    image: string;
    name: string;
    price: string;
};

export function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-5 lg:gap-x-7 2xl:gap-x-10">
            {products.map((product) => (
                <article className="group space-y-3" key={product.name}>
                    <img alt={product.name} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.02]" src={product.image} />
                    <div className="space-y-1">
                        <h3 className="text-xs font-semibold text-stone-900 sm:text-sm">{product.name}</h3>
                        <p className="text-xs text-stone-500">{product.price}</p>
                    </div>
                </article>
            ))}
        </div>
    );
}