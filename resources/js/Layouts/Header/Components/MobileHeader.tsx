import { HomeIcon, LogOutIcon, ShoppingBagIcon, UserRoundIcon, XIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { cart, home, login, logout, profile } from '@/routes';
import { USER_AVATAR_IMAGE } from '@/constants/images';
import type { MobileHeaderProps } from '../types/HeaderTypes';

export function MobileHeader({ user, lang, onClose }: MobileHeaderProps) {
    const { t } = useTranslation('header');

    return (
        <>
            <button aria-label={t('accountMenu')} className="fixed inset-0 z-60 bg-brand-charcoal/20 backdrop-blur-[2px] md:hidden" onClick={onClose} type="button" />
            <aside className="fixed inset-y-0 right-0 z-70 w-[min(20rem,88vw)] overflow-y-auto border-l border-stone-200 bg-brand-stone shadow-2xl md:hidden">
                <div className="flex items-center justify-between border-b border-brand-olive/15 px-5 py-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em]">{t('accountMenu')}</span>
                    <button aria-label={t('closeAccountMenu')} className="grid size-8 place-items-center rounded-full text-brand-olive/70 transition hover:bg-white hover:text-brand-charcoal" onClick={onClose} type="button">
                        <XIcon aria-hidden="true" size={17} strokeWidth={1.8} />
                    </button>
                </div>
                <div className="border-b border-brand-olive/15 px-5 py-5">
                    <div className="flex items-center gap-3">
                        <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-brand-taupe/30">
                            <img alt="" className="size-full object-cover" src={USER_AVATAR_IMAGE} />
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold">{user?.name ?? t('guest')}</span>
                            <span className="block truncate text-xs text-brand-olive/65">{user?.email ?? t('signIn')}</span>
                        </span>
                    </div>
                </div>
                <nav aria-label={t('accountMenu')} className="space-y-1 px-5 py-6">
                    <Link className="flex items-center gap-3 rounded-md px-3 py-3 text-xs font-medium text-brand-olive transition hover:bg-white hover:text-brand-charcoal" href={home.url({ lang })} onClick={onClose}>
                        <HomeIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                        {t('navHome')}
                    </Link>
                    {user ? (
                        <>
                            <Link className="flex items-center gap-3 rounded-md px-3 py-3 text-xs font-medium text-brand-olive transition hover:bg-white hover:text-brand-charcoal" href={cart.url({ lang })} onClick={onClose}>
                                <ShoppingBagIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                                {t('navCart')}
                            </Link>
                            <Link className="flex items-center gap-3 rounded-md px-3 py-3 text-xs font-medium text-brand-olive transition hover:bg-white hover:text-brand-charcoal" href={profile.url({ lang })} onClick={onClose}>
                                <UserRoundIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                                {t('navProfile')}
                            </Link>
                        </>
                    ) : (
                        <Link className="flex items-center w-full gap-3 rounded-md px-3 py-3 text-xs font-medium text-brand-olive transition hover:bg-white hover:text-brand-charcoal" href={login.url({ lang })} onClick={onClose}>
                            <UserRoundIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                            {t('signIn')}
                        </Link>
                    )}
                    {user ? (
                        <Link aria-label={t('signOut')} className="mt-5 flex items-center w-full gap-3 border-t border-brand-olive/15 px-3 pt-5 text-xs font-medium text-brand-olive transition hover:text-brand-charcoal" href={logout.url()} method="post" as="button" onClick={onClose}>
                            <LogOutIcon aria-hidden="true" size={16} strokeWidth={1.8} />
                            {t('signOut')}
                        </Link>
                    ) : null}
                </nav>
            </aside>
        </>
    );
}