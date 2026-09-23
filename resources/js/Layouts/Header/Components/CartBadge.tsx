import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { SharedPageProps } from '@/types/shared';

export function CartBadge() {
    const { props } = usePage<SharedPageProps>();
    const cartCount = props.cartCount ?? 0;
    const previous = useRef<number | null>(null);
    const [bounceKey, setBounceKey] = useState(0);

    useEffect(() => {
        if (previous.current !== null && cartCount > previous.current) {
            setBounceKey((key) => key + 1);
        }

        previous.current = cartCount;
    }, [cartCount]);

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