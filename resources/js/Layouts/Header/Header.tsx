import { Link } from '@inertiajs/react';
import {
    ChevronDownIcon,
    MenuIcon,
    SearchIcon,
    ShoppingBagIcon,
    UserRoundIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { brand } from '@/constants/brand';
import { USER_AVATAR_IMAGE } from '@/constants/images';
import { cart, home, login, profile } from '@/routes';
import { focusRing } from './constants/focusRing';
import { CartBadge } from './Components/CartBadge';
import { MobileHeader } from './Components/MobileHeader';
import { SearchModal } from './Components/SearchModal';
import { useHeader } from './hooks/useHeader';

export function Header() {
    const { t } = useTranslation('header');
    const {
        user,
        lang,
        availableLocales,
        isSearchOpen,
        searchQuery,
        isMobileAccountOpen,
        setIsMobileAccountOpen,
        openSearch,
        closeSearch,
        handleLanguageChange,
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
                            <Link
                                className="hidden items-center gap-2 border-l border-brand-olive/20 pl-3 text-xs font-semibold text-brand-olive transition hover:text-brand-charcoal sm:flex sm:pl-4"
                                href={profile.url({ lang })}>
                                <span
                                    className="grid size-8 place-items-center overflow-hidden rounded-full bg-brand-taupe/30">
                                    <img alt="" className="size-full object-cover"
                                         src={USER_AVATAR_IMAGE}/>
                                </span>
                                <span className="max-w-32 truncate">{user.name}</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                className={`hidden items-center rounded-full border border-brand-charcoal/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-charcoal transition hover:border-brand-charcoal/30 hover:bg-brand-charcoal/5 sm:inline-flex ${focusRing} focus-visible:outline-brand-charcoal`}
                                href={login.url({ lang })}
                            >
                                {t('signIn')}
                            </Link>
                            <div className="relative shrink-0">
                                <select
                                    aria-label={t('language')}
                                    className={`h-8 cursor-pointer appearance-none rounded-full border border-brand-charcoal/15 bg-transparent pl-3 pr-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-charcoal outline-none transition hover:border-brand-charcoal/30 hover:bg-brand-charcoal/5 ${focusRing} focus-visible:outline-brand-charcoal`}
                                    onChange={handleLanguageChange}
                                    value={lang}
                                >
                                    {availableLocales.map((locale) => (
                                        <option key={locale} value={locale}>
                                            {t(`lang.${locale}`, locale.toUpperCase())}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDownIcon
                                    aria-hidden="true"
                                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-brand-olive/70"
                                    size={13}
                                    strokeWidth={1.8}
                                />
                            </div>
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