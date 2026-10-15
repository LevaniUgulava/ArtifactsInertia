import { useTranslation } from 'react-i18next';
import { ProductActions } from '@/Pages/Product/Components/ProductActions';
import { ProductBenefits } from '@/Pages/Product/Components/ProductBenefits';
import { ProductVariantSelector } from '@/Pages/Product/Components/ProductVariantSelector';
import { useProductPurchasePanel } from '@/Pages/Product/hooks/useProductPurchasePanel';
import type { ProductPurchasePanelProps } from '@/Pages/Product/ProductTypes';

export function ProductPurchasePanel({ product, favorited }: ProductPurchasePanelProps) {
    const { t } = useTranslation('product');
    const {
        availableSizes,
        selectedColor,
        selectedSize,
        handleColorChange,
        handleSizeChange,
        showSizeChart,
        toggleSizeChart,
        addedToCart,
        canAddToCart,
        error,
        processing,
        handleAddToCart,
        isFavorited,
        toggleFavorite,
    } = useProductPurchasePanel(product, favorited);

    return (
        <section className="space-y-5">
            <div>
                <p className="text-[10px] font-semibold text-amber-700">{product.eyebrow}</p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">{product.name}</h1>
                <p className="mt-1 text-base font-semibold text-stone-950">{product.price}</p>
            </div>
            <p className="max-w-xl text-xs leading-5 text-stone-600">{product.description}</p>
            <ProductVariantSelector availableSizes={availableSizes} colors={product.colors} onColorChange={handleColorChange} onSizeChange={handleSizeChange} onSizeChart={toggleSizeChart} selectedColor={selectedColor} selectedSize={selectedSize} sizes={product.sizes} />
            {showSizeChart ? <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-[10px] leading-5 text-stone-600">{t('sizeChartText')}</div> : null}
            <ProductActions
                addedToCart={addedToCart}
                canAddToCart={canAddToCart}
                error={error}
                onAddToCart={handleAddToCart}
                onWishlist={toggleFavorite}
                processing={processing}
                wishlisted={isFavorited}
            />
            <ProductBenefits benefits={product.benefits} />
        </section>
    );
}