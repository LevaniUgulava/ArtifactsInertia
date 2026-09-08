import { useState } from 'react';
import type { ProductData } from './ProductTypes';
import { ProductActions } from './ProductActions';
import { ProductBenefits } from './ProductBenefits';
import { ProductVariantSelector } from './ProductVariantSelector';

export function ProductPurchasePanel({ product }: { product: ProductData }) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value ?? '');
    const [selectedSize, setSelectedSize] = useState('');
    const [addedToCart, setAddedToCart] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);

    return (
        <section className="space-y-5">
            <div>
                <p className="text-[10px] font-semibold text-amber-700">{product.eyebrow}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">{product.name}</h1>
                <p className="mt-1 text-base font-semibold text-stone-950">{product.price}</p>
            </div>
            <p className="max-w-xl text-xs leading-5 text-stone-600">{product.description}</p>
            <ProductVariantSelector colors={product.colors} onColorChange={setSelectedColor} onSizeChange={setSelectedSize} onSizeChart={() => setShowSizeChart((visible) => !visible)} selectedColor={selectedColor} selectedSize={selectedSize} sizes={product.sizes} />
            {showSizeChart ? <div className="border border-stone-200 bg-stone-50 p-4 text-[10px] leading-5 text-stone-600">For this relaxed fit, choose your usual size. Size down for a closer silhouette. Measurements are listed in the Fit &amp; Sizing section below.</div> : null}
            <ProductActions addedToCart={addedToCart} canAddToCart={Boolean(selectedColor && selectedSize)} onAddToCart={() => setAddedToCart(true)} onWishlist={() => setWishlisted((active) => !active)} wishlisted={wishlisted} />
            <ProductBenefits benefits={product.benefits} />
        </section>
    );
}
