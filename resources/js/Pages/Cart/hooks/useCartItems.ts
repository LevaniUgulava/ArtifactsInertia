import { router, useHttp } from '@inertiajs/react';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import type { CartItem } from '../types/CartTypes';
import { destroy as cartItemDestroy, save as cartItemSave, update as cartItemUpdate } from '@/routes/cart/items';

function withoutError(errors: Record<string, string>, id: string): Record<string, string> {
    const remaining = { ...errors };
    delete remaining[id];

    return remaining;
}

export function useCartItems(initialItems: CartItem[]) {
    const locale = useLocale();
    const [items, setItems] = useState(initialItems);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { delete: removeRequest, patch, post, transform } = useHttp<{ quantity?: number }>({});

    function setQuantity(id: string, quantity: number) {
        const previous = items.find((item) => item.id === id)?.quantity ?? quantity;

        setItems((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
        setErrors((current) => withoutError(current, id));

        transform(() => ({ quantity }));
        patch(cartItemUpdate.url({ lang: locale, item: Number(id) }), {
            onSuccess: () => router.reload({ only: ['cartCount'] }),
            onError: (formErrors) => {
                setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: previous } : item));
                setErrors((current) => ({
                    ...current,
                    [id]: formErrors.quantity ?? 'Could not update the quantity.',
                }));
            },
        });
    }

    function removeItem(id: string) {
        const removed = items.find((item) => item.id === id);
        if (removed === undefined) {
            return;
        }

        setItems((current) => current.filter((item) => item.id !== id));
        setErrors((current) => withoutError(current, id));

        transform(() => ({}));
        removeRequest(cartItemDestroy.url({ lang: locale, item: Number(id) }), {
            onSuccess: () => router.reload({ only: ['cartCount'] }),
            onError: () => {
                setItems((current) => (current.some((item) => item.id === id) ? current : [...current, removed]));
            },
        });
    }

    function saveItem(id: string) {
        const saved = items.find((item) => item.id === id);
        if (saved === undefined) {
            return;
        }

        setItems((current) => current.filter((item) => item.id !== id));
        setErrors((current) => withoutError(current, id));

        transform(() => ({}));
        post(cartItemSave.url({ lang: locale, item: Number(id) }), {
            onSuccess: () => router.reload({ only: ['cartCount'] }),
            onError: () => {
                setItems((current) => (current.some((item) => item.id === id) ? current : [...current, saved]));
            },
        });
    }

    return {
        errors,
        items,
        removeItem,
        saveItem,
        setQuantity,
    };
}