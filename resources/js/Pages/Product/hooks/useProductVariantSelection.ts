import { useState } from 'react';
import type { ProductData } from '../Components/ProductTypes';

export function useProductVariantSelection(product: ProductData) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.value ?? '');
    const [selectedSize, setSelectedSize] = useState('');

    const availableSizes = product.colors.find((color) => color.value === selectedColor)?.availableSizes ?? [];

    function changeColor(value: string) {
        setSelectedColor(value);
        const nextAvailableSizes = product.colors.find((color) => color.value === value)?.availableSizes ?? [];
        if (selectedSize && !nextAvailableSizes.includes(selectedSize)) {
            setSelectedSize('');
        }
    }

    return {
        availableSizes,
        changeColor,
        changeSize: setSelectedSize,
        selectedColor,
        selectedSize,
    };
}
