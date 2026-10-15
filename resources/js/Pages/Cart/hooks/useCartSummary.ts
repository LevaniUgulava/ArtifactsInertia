import { useMemo, useState } from 'react';
import { PROMO_CODE, PROMO_DISCOUNT } from '@/constants/promo';
import type { CartItem } from '@/Pages/Cart/CartTypes';

export function useCartSummary(items: CartItem[], shipping: number | string | null) {
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const subtotal = useMemo(
        () => items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0),
        [items],
    );
    const discount = promoApplied ? PROMO_DISCOUNT : 0;
    const shippingCost = Number(shipping) || 0;
    const total = Math.max(0, subtotal + shippingCost - discount);
    const itemCount = items.reduce((count, item) => count + (Number(item.quantity) || 0), 0);

    function applyPromoCode() {
        setPromoApplied(promoCode.trim().toUpperCase() === PROMO_CODE);
    }

    return {
        promoCode,
        setPromoCode,
        promoApplied,
        subtotal,
        discount,
        shipping: shippingCost,
        total,
        itemCount,
        applyPromoCode,
    };
}