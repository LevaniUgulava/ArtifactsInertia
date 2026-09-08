import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react';


createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<ResolvedComponent>('./Pages/**/*.tsx');

        return pages[`./Pages/${name}.tsx`]();
    },
    strictMode: true,
});
