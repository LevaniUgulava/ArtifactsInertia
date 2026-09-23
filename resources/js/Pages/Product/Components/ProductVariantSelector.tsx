import { useTranslation } from 'react-i18next';
import type { ProductVariantSelectorProps } from '../types/ProductTypes';

export function ProductVariantSelector({ availableSizes, colors, sizes, selectedColor, selectedSize, onColorChange, onSizeChange, onSizeChart }: ProductVariantSelectorProps) {
    const { t } = useTranslation(['product', 'catalog']);

    return (
        <div className="space-y-6 border-t border-stone-200 pt-6">
            <fieldset className="space-y-3">
                <legend className="text-xs font-semibold text-stone-950">{t('color', { ns: 'catalog' })}</legend>
                <div className="flex gap-3">
                    {colors.map((color) => (
                        <button
                            aria-label={t('selectColor', { name: color.label })}
                            aria-pressed={selectedColor === color.value}
                            className={`size-5 rounded-full border-2 p-0.5 transition ${selectedColor === color.value ? ' ring-amber-700 ring-offset-2' : 'border-transparent'}`}
                            key={color.value}
                            onClick={() => onColorChange(color.value)}
                            type="button"
                        >
                            <span className="block size-full rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                        </button>
                    ))}
                </div>
            </fieldset>

            <fieldset className="space-y-3">
                <div className="flex items-center justify-between">
                    <legend className="text-xs font-semibold text-stone-950">{t('size', { ns: 'catalog' })}</legend>
                    <button className="text-[10px] text-amber-700 underline underline-offset-4" onClick={onSizeChart} type="button">{t('sizeGuide')}</button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <button
                            aria-pressed={selectedSize === size.value}
                            className={`min-w-10 border px-3 py-2 text-[10px] transition ${selectedSize === size.value ? 'border-amber-700 bg-amber-700 text-white' : 'border-stone-200 text-stone-700 hover:border-stone-500'} ${!availableSizes.includes(size.value) ? 'cursor-not-allowed opacity-40 line-through' : ''}`}
                            disabled={!availableSizes.includes(size.value)}
                            key={size.value}
                            onClick={() => onSizeChange(size.value)}
                            type="button"
                        >
                            {size.value}
                        </button>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}