import { router, useHttp } from '@inertiajs/react';
import { useLocale } from '@/hooks/useLocale';
import { store as cartItemStore } from '@/routes/cart/items';
import type { AddToCartInput } from '../types/ProductTypes';

export function useAddToCart() {
    const locale = useLocale();
    const { post, processing, transform, reset, errors } = useHttp<AddToCartInput>({
        slug: '',
        color: '',
        size: '',
    });

    function addToCart(input: AddToCartInput, onSuccess?: () => void) {
        transform(() => input);
        post(cartItemStore.url({ lang: locale }), {
            onSuccess: () => {
                router.reload({ only: ['cartCount'] });
                reset();
                onSuccess?.();
            },
        });
    }

    return {
        addToCart,
        errors,
        processing,
    };
}