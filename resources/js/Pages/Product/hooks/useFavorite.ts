import { router, useHttp, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { login } from '@/routes';
import { destroy, store } from '@/routes/favorites';

type AuthenticatedUser = {
    id: number;
};

export function useFavorite(slug: string, initial: boolean) {
    const locale = useLocale();
    const { props } = usePage<{ auth: { user: AuthenticatedUser | null } }>();
    const { post, delete: requestDestroy } = useHttp<Record<string, never>>({});
    const [favorited, setFavorited] = useState(initial);

    function toggleFavorite() {
        if (props.auth?.user === null || props.auth?.user === undefined) {
            router.visit(login.url({ lang: locale }));

            return;
        }

        setFavorited((active) => !active);

        if (favorited) {
            requestDestroy(destroy.url({ lang: locale, product: slug }), {
                onError: () => setFavorited((active) => !active),
            });
        } else {
            post(store.url({ lang: locale, product: slug }), {
                onError: () => setFavorited((active) => !active),
            });
        }
    }

    return {
        favorited,
        toggleFavorite,
    };
}