import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ProductImage } from './ProductTypes';

export function ProductGallery({ images }: { images: ProductImage[] }) {
    const { t } = useTranslation('product');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const selectedImage = images[selectedIndex] ?? images[0];

    return (
        <div className="grid gap-3 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
            <div aria-label={t('productImages')} className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
                {images.map((image, index) => (
                    <button
                        aria-label={t('showImage', { number: index + 1 })}
                        aria-pressed={selectedIndex === index}
                        className={`size-14 shrink-0 overflow-hidden border-2 transition sm:size-16 ${selectedIndex === index ? 'border-amber-700' : 'border-transparent hover:border-stone-300'}`}
                        key={image.src}
                        onClick={() => setSelectedIndex(index)}
                        type="button"
                    >
                        <img alt="" className="size-full object-cover" src={image.src} />
                    </button>
                ))}
            </div>
            <div className="order-1 aspect-[4/5] overflow-hidden bg-stone-100 sm:order-2">
                <img alt={selectedImage?.alt ?? ''} className="size-full object-cover" src={selectedImage?.src} />
            </div>
        </div>
    );
}
