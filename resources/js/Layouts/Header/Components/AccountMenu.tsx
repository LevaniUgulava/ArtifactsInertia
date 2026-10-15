import {Link} from '@inertiajs/react';
import {HeartIcon, ListOrderedIcon, LogOutIcon, ShoppingBagIcon, UserRoundIcon} from 'lucide-react';
import {useTranslation} from 'react-i18next';
import {USER_AVATAR_IMAGE} from '@/constants/images';
import {cart, favorites, logout, profile} from '@/routes';
import {Popover, PopoverContent, PopoverTrigger} from '@/Components/ui/popover';
import {focusRing} from '@/constants/focusRing';
import type {AccountMenuProps} from '@/Layouts/Header/HeaderTypes';

export function AccountMenu({user, lang}: AccountMenuProps) {
    const {t} = useTranslation('header');

    return (
        <Popover>
            <PopoverTrigger
                aria-label={t('profileMenu')}
                className={`hidden items-center gap-2 text-xs font-semibold text-brand-olive hover:text-brand-charcoal sm:flex ${focusRing} focus-visible:outline-brand-charcoal`}
                type="button"
            >
                <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-brand-taupe/30">
                    <img alt="" className="size-full object-cover" src={USER_AVATAR_IMAGE}/>
                </span>
            </PopoverTrigger>
            <PopoverContent align="end" animate={false} positionMethod="fixed"
                            className="w-64 gap-1 rounded-xl border border-brand-olive/15 bg-brand-stone p-2 text-brand-charcoal shadow-lg"
                            sideOffset={10}>
                <div className="px-3 py-2">
                    <p className="truncate text-xs font-semibold">{user.name}</p>
                    <p className="mt-0.5 truncate text-[11px] text-brand-olive/70">{user.email}</p>
                </div>
                <nav aria-label={t('accountMenu')} className="grid gap-0.5 pt-1">
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-brand-olive hover:bg-brand-olive/10 hover:text-brand-charcoal"
                        href={profile.url({lang})}>
                        <UserRoundIcon aria-hidden="true" size={15} strokeWidth={1.8}/>
                        {t('navProfile')}
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-brand-olive hover:bg-brand-olive/10 hover:text-brand-charcoal"
                        href={profile.url({lang}, {query: {section: 'orders'}})}>
                        <ListOrderedIcon aria-hidden="true" size={15} strokeWidth={1.8}/>
                        {t('navOrders')}
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-brand-olive hover:bg-brand-olive/10 hover:text-brand-charcoal"
                        href={favorites.url({lang})}>
                        <HeartIcon aria-hidden="true" size={15} strokeWidth={1.8}/>
                        {t('navFavorites')}
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs text-brand-olive hover:bg-brand-olive/10 hover:text-brand-charcoal"
                        href={cart.url({lang})}>
                        <ShoppingBagIcon aria-hidden="true" size={15} strokeWidth={1.8}/>
                        {t('navCart')}
                    </Link>
                </nav>
                <Link aria-label={t('signOut')}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs text-brand-olive hover:bg-brand-olive/10 hover:text-brand-charcoal"
                      href={logout.url()} method="post" as="button">
                    <LogOutIcon aria-hidden="true" size={15} strokeWidth={1.8}/>
                    {t('signOut')}
                </Link>
            </PopoverContent>
        </Popover>
    );
}
