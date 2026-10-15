import { useState } from 'react';
import type { ProductImage } from '@/Pages/Product/ProductTypes';

export function useProductGallery(images: ProductImage[]) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = images[selectedIndex] ?? images[0];

    function selectImage(index: number) {
        setSelectedIndex(index);
    }

    return { selectedIndex, selectedImage, selectImage };
}