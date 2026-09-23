import { HeartIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type ProductActionsProps = {
    canAddToCart: boolean;
    addedToCart: boolean;
    wishlisted: boolean;
    processing: boolean;
    error?: string;
    onAddToCart: () => void;
    onWishlist: () => void;
};

export function ProductActions({ canAddToCart, addedToCart, wishlisted, processing, error = '', onAddToCart, onWishlist }: ProductActionsProps) {
    const { t } = useTranslation('product');

    return (
        <div className="space-y-3">
            <button className="w-full bg-[#b58a52] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#9d7442] disabled:cursor-not-allowed disabled:bg-stone-300" disabled={!canAddToCart || processing} onClick={onAddToCart} type="button">
                {processing ? '…' : (addedToCart ? t('addedToBag') : t('addToBag'))}
            </button>
            <button aria-pressed={wishlisted} className="flex w-full items-center justify-center gap-2 border border-stone-200 px-4 py-3 text-xs font-semibold text-stone-700 transition hover:border-stone-500" onClick={onWishlist} type="button">
                <HeartIcon aria-hidden="true" fill={wishlisted ? 'currentColor' : 'none'} size={14} />
                {wishlisted ? t('addedToWishlist') : t('addToWishlist')}
            </button>
            {error && <p className="text-center text-[10px] text-red-500">{error}</p>}
            {addedToCart && !error ? <p className="text-center text-[10px] text-stone-500">{t('cartPending')}</p> : null}
        </div>
    );
}