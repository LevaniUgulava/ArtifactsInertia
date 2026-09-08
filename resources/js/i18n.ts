import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import auth from './locales/en/auth.json';
import catalog from './locales/en/catalog.json';
import cart from './locales/en/cart.json';
import checkout from './locales/en/checkout.json';
import common from './locales/en/common.json';
import footer from './locales/en/footer.json';
import header from './locales/en/header.json';
import home from './locales/en/home.json';
import product from './locales/en/product.json';
import profile from './locales/en/profile.json';

import authKa from './locales/ka/auth.json';
import catalogKa from './locales/ka/catalog.json';
import cartKa from './locales/ka/cart.json';
import checkoutKa from './locales/ka/checkout.json';
import commonKa from './locales/ka/common.json';
import footerKa from './locales/ka/footer.json';
import headerKa from './locales/ka/header.json';
import homeKa from './locales/ka/home.json';
import productKa from './locales/ka/product.json';
import profileKa from './locales/ka/profile.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            auth,
            catalog,
            cart,
            checkout,
            common,
            footer,
            header,
            home,
            product,
            profile,
        },
        ka: {
            auth: authKa,
            catalog: catalogKa,
            cart: cartKa,
            checkout: checkoutKa,
            common: commonKa,
            footer: footerKa,
            header: headerKa,
            home: homeKa,
            product: productKa,
            profile: profileKa,
        },
    },
    ns: ['common'],
    defaultNS: 'common',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
