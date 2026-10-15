import { useState } from 'react';
import { useAddToCart } from '@/Pages/Product/hooks/useAddToCart';
import { useFavorite } from '@/Pages/Product/hooks/useFavorite';
import { useProductVariantSelection } from '@/Pages/Product/hooks/useProductVariantSelection';
import type { ProductData } from '@/Pages/Product/ProductTypes';

export function useProductPurchasePanel(product: ProductData, favorited: boolean) {
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

    function toggleSizeChart() {
        setShowSizeChart((visible) => !visible);
    }

    function handleAddToCart() {
        addToCart({ slug: product.slug, color: selectedColor, size: selectedSize }, () => setAddedToCart(true));
    }

    return {
        availableSizes,
        selectedColor,
        selectedSize,
        handleColorChange,
        handleSizeChange,
        showSizeChart,
        toggleSizeChart,
        addedToCart,
        canAddToCart: Boolean(selectedColor && selectedSize),
        error: errors.size ?? '',
        processing,
        handleAddToCart,
        isFavorited,
        toggleFavorite,
    };
}