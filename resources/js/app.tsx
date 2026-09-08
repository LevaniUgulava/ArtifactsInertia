import { createInertiaApp, router, type ResolvedComponent } from '@inertiajs/react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function syncLocale(page: InertiaPage) {
    const locale = page.props.locale as string | undefined;

    console.log('[locale-sync] page locale:', locale, 'i18n:', i18n.language);

    if (locale && locale !== i18n.language) {
        i18n.changeLanguage(locale);
    }
}

type InertiaPage = {
    props: Record<string, unknown>;
};

router.on('success', (event) => syncLocale(event.detail.page));
router.on('navigate', (event) => syncLocale(event.detail.page));

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob<ResolvedComponent>('./Pages/**/*.tsx');

        return pages[`./Pages/${name}.tsx`]();
    },
    setup({ el, App, props }) {
        syncLocale(props.initialPage);

        return (
            <I18nextProvider i18n={i18n}>
                <App {...props} />
            </I18nextProvider>
        );
    },
    strictMode: true,
});