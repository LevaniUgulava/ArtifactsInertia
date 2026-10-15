import { Link } from '@inertiajs/react';
import { MenuIcon, SearchIcon, ShoppingBagIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brand } from '@/constants/brand';
import { cart, home, login, register } from '@/routes';
import { focusRing } from '@/constants/focusRing';
import {useHeader} from "@/Layouts/Header/hooks/useHeader";
import {SearchModal} from "@/Layouts/Header/Components/SearchModal";
import {CartBadge} from "@/Layouts/Header/Components/CartBadge";
import {AccountMenu} from "@/Layouts/Header/Components/AccountMenu";
import {MobileHeader} from "@/Layouts/Header/Components/MobileHeader";

export function Header() {
    const { t } = useTranslation('header');
    const {
        user,
        lang,
        isSearchOpen,
        searchQuery,
        isMobileAccountOpen,
        setIsMobileAccountOpen,
        openSearch,
        closeSearch,
    } = useHeader();

    return (
        <header className="sticky top-0 z-50 border-b border-brand-olive/20 bg-brand-stone">
            <div
                className="mx-auto flex max-w-[1920px] items-center justify-between gap-3 px-4 py-4 sm:gap-5 sm:px-8 lg:px-12 2xl:px-16">
                <Link aria-label={brand.name} className="shrink-0 text-brand-charcoal" href={home.url({ lang })}>
                    <span className="font-display text-lg tracking-[0.22em] sm:text-xl">{brand.name}</span>
                </Link>

                <div className="flex items-center gap-2 text-brand-charcoal sm:gap-3">

                    <div className="relative flex h-8 shrink-0 items-center">
                        <button aria-expanded={isSearchOpen} aria-label={t('search')}
                                className={`grid size-8 shrink-0 place-items-center rounded-full transition hover:bg-brand-olive/10 ${focusRing} focus-visible:outline-brand-charcoal`}
                                onClick={openSearch} type="button">
                            <SearchIcon aria-hidden="true" size={17} strokeWidth={1.8}/>
                        </button>
                    </div>
                    <button aria-expanded={isMobileAccountOpen} aria-label={t('accountMenu')}
                            className={`grid size-8 shrink-0 place-items-center rounded-full transition hover:bg-brand-olive/10 md:hidden ${focusRing} focus-visible:outline-brand-charcoal`}
                            onClick={() => setIsMobileAccountOpen(true)} type="button">
                        <MenuIcon aria-hidden="true" size={17} strokeWidth={1.8}/>
                    </button>

                    {user ? (
                        <>
<div className="relative hidden md:block">
                            <Link aria-label={t('openBag')}
                                  className={`grid size-8 place-items-center rounded-full transition hover:bg-brand-olive/10 ${focusRing} focus-visible:outline-brand-charcoal`}
                                  href={cart.url({ lang })}>
                                <ShoppingBagIcon aria-hidden="true" size={17} strokeWidth={1.8}/>
                            </Link>
                            <CartBadge />
                        </div>
                            <AccountMenu user={user} lang={lang}/>
                        </>
                    ) : (
                        <>
                            <Link
                                className={`hidden items-center rounded-full border border-brand-charcoal/15 px-4 py-2 text-[11px] font-semibold text-brand-charcoal transition hover:border-brand-charcoal/30 hover:bg-brand-charcoal/5 sm:inline-flex ${focusRing} focus-visible:outline-brand-charcoal`}
                                href={login.url({ lang })}
                            >
                                {t('signIn')}
                            </Link>
                            <Link
                                className={`hidden items-center rounded-full bg-brand-charcoal px-4 py-2 text-[11px] font-semibold text-brand-stone transition hover:bg-brand-olive sm:inline-flex ${focusRing} focus-visible:outline-brand-charcoal`}
                                href={register.url({ lang })}
                            >
                                {t('signUp')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {isMobileAccountOpen ? (
                <MobileHeader user={user} lang={lang} onClose={() => setIsMobileAccountOpen(false)} />
            ) : null}

            {isSearchOpen ? <SearchModal initialQuery={searchQuery} lang={lang} onClose={closeSearch} /> : null}
        </header>
    );
}
