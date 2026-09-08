import { HeartIcon } from 'lucide-react';

type ProductActionsProps = {
    canAddToCart: boolean;
    addedToCart: boolean;
    wishlisted: boolean;
    onAddToCart: () => void;
    onWishlist: () => void;
};

export function ProductActions({ canAddToCart, addedToCart, wishlisted, onAddToCart, onWishlist }: ProductActionsProps) {
    return (
        <div className="space-y-3">
            <button className="w-full bg-[#b58a52] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#9d7442] disabled:cursor-not-allowed disabled:bg-stone-300" disabled={!canAddToCart} onClick={onAddToCart} type="button">
                {addedToCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button aria-pressed={wishlisted} className="flex w-full items-center justify-center gap-2 border border-stone-200 px-4 py-3 text-xs font-semibold text-stone-700 transition hover:border-stone-500" onClick={onWishlist} type="button">
                <HeartIcon aria-hidden="true" fill={wishlisted ? 'currentColor' : 'none'} size={14} />
                {wishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
            {addedToCart ? <p className="text-center text-[10px] text-stone-500">Your selection is ready for the bag. Cart persistence will be connected to the approved cart contract.</p> : null}
        </div>
    );
}
