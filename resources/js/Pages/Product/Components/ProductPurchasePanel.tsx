import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAddToCart } from '../hooks/useAddToCart';
import { useFavorite } from '../hooks/useFavorite';
import { useProductVariantSelection } from '../hooks/useProductVariantSelection';
import type { ProductPurchasePanelProps } from '../types/ProductTypes';
import { ProductActions } from './ProductActions';
import { ProductBenefits } from './ProductBenefits';
import { ProductVariantSelector } from './ProductVariantSelector';

export function ProductPurchasePanel({ product, favorited }: ProductPurchasePanelProps) {
    const { t } = useTranslation('product');
    const { availableSizes, changeColor, changeSize, selectedColor, selectedSize } = useProductVariantSelection(product);
    const { addToCart, errors, processing } = useAddToCart();
    const { favorited: isFavorited, toggleFavorite } = useFavorite(product.slug, favorited);
    const [addedToCart, setAddedToCart] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);

    function handleColorChange(value: string) {
        changeColor(value);
        setAddedToCart(false);
    }

    function handleSizeChange(value: string) {
        changeSize(value);
        setAddedToCart(false);
    }

    return (
        <section className="space-y-5">
            <div>
                <p className="text-[10px] font-semibold text-amber-700">{product.eyebrow}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">{product.name}</h1>
                <p className="mt-1 text-base font-semibold text-stone-950">{product.price}</p>
            </div>
            <p className="max-w-xl text-xs leading-5 text-stone-600">{product.description}</p>
            <ProductVariantSelector availableSizes={availableSizes} colors={product.colors} onColorChange={handleColorChange} onSizeChange={handleSizeChange} onSizeChart={() => setShowSizeChart((visible) => !visible)} selectedColor={selectedColor} selectedSize={selectedSize} sizes={product.sizes} />
            {showSizeChart ? <div className="border border-stone-200 bg-stone-50 p-4 text-[10px] leading-5 text-stone-600">{t('sizeChartText')}</div> : null}
            <ProductActions
                addedToCart={addedToCart}
                canAddToCart={Boolean(selectedColor && selectedSize)}
                error={errors.size ?? ''}
                onAddToCart={() => addToCart({ slug: product.slug, color: selectedColor, size: selectedSize }, () => setAddedToCart(true))}
                onWishlist={toggleFavorite}
                processing={processing}
                wishlisted={isFavorited}
            />
            <ProductBenefits benefits={product.benefits} />
        </section>
    );
}