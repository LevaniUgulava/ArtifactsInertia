import { usePage } from '@inertiajs/react';

export function useProfileView() {
    const { url } = usePage();
    const isOrdersView = new URLSearchParams(url.split('?')[1] ?? '').get('section') === 'orders';

    return { isOrdersView };
}