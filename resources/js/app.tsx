import { createInertiaApp, router, type ResolvedComponent } from '@inertiajs/react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import type { InertiaPage } from './types/app';

function syncLocale(page: InertiaPage) {
    const locale = page.props.locale as string | undefined;


    if (locale && locale !== i18n.language) {
        i18n.changeLanguage(locale);
    }
}

router.on('success', (event) => syncLocale(event.detail.page));
router.on('navigate', (event) => syncLocale(event.detail.page));

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<ResolvedComponent>('./Pages/**/*.tsx');

        return pages[`./Pages/${name}.tsx`]();
    },
    setup({ el, App, props }) {
        syncLocale(props.initialPage);

        const app = (
            <I18nextProvider i18n={i18n}>
                <App {...props} />
            </I18nextProvider>
        );

        if (!el) {
            return app;
        }

        if (el.hasAttribute('data-server-rendered')) {
            hydrateRoot(el, app);
        } else {
            createRoot(el).render(app);
        }

        return app;
    },
    strictMode: true,
});
