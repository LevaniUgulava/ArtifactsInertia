import { Link } from '@inertiajs/react';
import { AtSignIcon, CameraIcon, GlobeIcon, MailIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BrandLockup } from '@/Components/Brand/Brand';
import { brand } from '@/constants/brand';
import { useLocale } from '@/hooks/useLocale';
import type { FooterLink, SocialIconProps } from '@/Layouts/Footer/FooterTypes';
import { cart, catalog, favorites, home, profile } from '@/routes';

export function Footer() {
    const { t } = useTranslation('footer');
    const lang = useLocale();
    const currentYear = new Date().getFullYear();

    const quickLinks: FooterLink[] = [
        { href: home.url({ lang }), label: t('links.home') },
        { href: catalog.url({ lang }), label: t('links.shopAll') },
        { href: profile.url({ lang }), label: t('links.profile') },
        { href: favorites.url({ lang }), label: t('links.favorites') },
        { href: cart.url({ lang }), label: t('links.bag') },
    ];

    return (
        <footer className="w-full border-t border-brand-olive/20 bg-brand-stone text-brand-charcoal">
            <div className="mx-auto max-w-[1920px] px-4 py-9 sm:px-8 sm:py-11 lg:px-12 lg:py-12 2xl:px-16">
                <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_13rem] md:gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-20">
                    <section className="max-w-xl">
                        <Link aria-label={brand.name} className="inline-flex" href={home.url({ lang })}>
                            <BrandLockup className="text-brand-charcoal" />
                        </Link>
                        <p className="mt-7 max-w-md text-xs leading-5 text-brand-olive/75 sm:text-sm sm:leading-6">{t('intro')}</p>
                        <div aria-label={t('socialLabel')} className="mt-6 flex items-center gap-3">
                            <a aria-label={t('social.email')} className="grid size-7 place-items-center rounded-md text-brand-olive transition hover:bg-brand-stone hover:text-brand-charcoal" href="mailto:support@artifacts.ge">
                                <MailIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                            </a>
                            <SocialIcon ariaLabel={t('social.linkedin')} icon={<GlobeIcon aria-hidden="true" size={16} strokeWidth={1.8} />} />
                            <SocialIcon ariaLabel={t('social.twitter')} icon={<AtSignIcon aria-hidden="true" size={16} strokeWidth={1.8} />} />
                            <SocialIcon ariaLabel={t('social.instagram')} icon={<CameraIcon aria-hidden="true" size={16} strokeWidth={1.8} />} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-sm font-semibold tracking-tight">{t('quickLinks')}</h2>
                        <nav aria-label={t('quickLinks')} className="mt-4 flex flex-col items-start gap-2.5">
                            {quickLinks.map((link) => (
                                <Link className="text-xs leading-5 text-brand-olive/80 transition hover:text-brand-charcoal sm:text-sm" href={link.href} key={link.href}>
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </section>
                </div>

                <div className="mt-9 flex flex-col gap-3 border-t border-brand-olive/15 pt-4 text-[10px] text-brand-olive/75 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-5">
                    <p>{t('copyright', { year: currentYear, brand: brand.name })}</p>
                    <nav aria-label={t('legalLabel')} className="flex flex-wrap items-center gap-x-5 gap-y-2">
                        <a className="underline-offset-4 transition hover:text-brand-charcoal hover:underline" href="#privacy">{t('policies.privacy')}</a>
                        <a className="underline-offset-4 transition hover:text-brand-charcoal hover:underline" href="#terms">{t('policies.terms')}</a>
                        <a className="underline-offset-4 transition hover:text-brand-charcoal hover:underline" href="#cookies">{t('policies.cookies')}</a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ ariaLabel, icon }: SocialIconProps) {
    return <span aria-label={ariaLabel} className="grid size-7 place-items-center rounded-md text-brand-olive" role="img">{icon}</span>;
}
