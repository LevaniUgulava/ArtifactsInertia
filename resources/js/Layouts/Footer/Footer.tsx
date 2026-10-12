import { Link } from '@inertiajs/react';
import { MailIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brand } from '@/constants/brand';
import { useLocale } from '@/hooks/useLocale';
import { cart, catalog, favorites, home, profile } from '@/routes';

type FooterLink = {
    href: string;
    label: string;
};

export function Footer() {
    const { t } = useTranslation('footer');
    const lang = useLocale();
    const currentYear = new Date().getFullYear();

    const shopLinks: FooterLink[] = [
        { href: catalog.url({ lang }), label: t('links.shopAll') },
        { href: favorites.url({ lang }), label: t('links.favorites') },
    ];

    const accountLinks: FooterLink[] = [
        { href: profile.url({ lang }), label: t('links.profile') },
        { href: cart.url({ lang }), label: t('links.bag') },
    ];

    return (
        <footer className="border-t border-brand-olive/15 bg-brand-stone text-brand-charcoal">
            <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
                <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] md:gap-8 lg:gap-16">
                    <section className="max-w-md">
                        <Link className="inline-flex text-brand-charcoal" href={home.url({ lang })}>
                            <span className="font-display text-xl tracking-[0.22em]">{brand.name}</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-6 text-brand-olive/75">{t('intro')}</p>
                    </section>

                    <FooterLinkGroup title={t('shop.title')} links={shopLinks} />
                    <FooterLinkGroup title={t('account.title')} links={accountLinks} />

                    <section>
                        <h2 className="text-sm font-semibold text-brand-charcoal">{t('help.title')}</h2>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-brand-olive/75">{t('help.description')}</p>
                        <a
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-charcoal transition hover:text-brand-taupe"
                            href="mailto:support@artifacts.ge"
                        >
                            <MailIcon aria-hidden="true" size={15} strokeWidth={1.8} />
                            {t('help.contact')}
                        </a>
                    </section>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-brand-olive/15 pt-5 text-xs text-brand-olive/65 sm:flex-row sm:items-center sm:justify-between">
                    <p>{t('copyright', { year: currentYear, brand: brand.name })}</p>
                    <p>{t('footerNote')}</p>
                </div>
            </div>
        </footer>
    );
}

function FooterLinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
    return (
        <section>
            <h2 className="text-sm font-semibold text-brand-charcoal">{title}</h2>
            <nav aria-label={title} className="mt-3 flex flex-col items-start gap-2.5">
                {links.map((link) => (
                    <Link
                        className="text-sm leading-6 text-brand-olive/75 transition hover:text-brand-charcoal"
                        href={link.href}
                        key={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </section>
    );
}
