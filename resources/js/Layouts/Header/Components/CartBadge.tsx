import { useCartBadge } from '@/Layouts/Header/hooks/useCartBadge';

export function CartBadge() {
    const { cartCount, bounceKey } = useCartBadge();

    if (cartCount <= 0) {
        return null;
    }

    return (
        <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-1 -top-1 grid h-4 min-w-4 animate-cart-bounce place-items-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white"
            key={bounceKey}
        >
            {cartCount > 99 ? '99+' : cartCount}
        </span>
    );
}