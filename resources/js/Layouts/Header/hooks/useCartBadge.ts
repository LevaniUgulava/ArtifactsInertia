import { usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import type { SharedPageProps } from '@/types/shared';

export function useCartBadge() {
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

    return { cartCount, bounceKey };
}