import { Link, usePage } from '@inertiajs/react';
import { HomeIcon, LayoutGridIcon, LogOutIcon, PackageIcon, ShoppingBagIcon, UserRoundIcon, WalletCardsIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cart, home, logout, profile } from '@/routes';
import { LanguageSwitcher } from '@/Components/LanguageSwitcher';

const navigationItems = [
    { label: 'navHome', icon: HomeIcon, href: home.url(), paths: ['/en'] },
    { label: 'navCatalog', icon: LayoutGridIcon, href: home.url(), paths: [] },
    { label: 'navProducts', icon: PackageIcon, href: home.url(), paths: [] },
    { label: 'navCart', icon: ShoppingBagIcon, href: cart.url(), paths: ['/cart'] },
    { label: 'navCheckout', icon: WalletCardsIcon, href: home.url(), paths: [] },
    { label: 'navProfile', icon: UserRoundIcon, href: profile.url(), paths: ['/profile', '/account'] },
];

export function ProfileSidebar() {
    const { t } = useTranslation('profile');
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    return (
        <aside className="w-full shrink-0 border-b border-stone-200 bg-[#f8f5f0] md:w-56 md:border-b-0 md:border-r lg:w-64">
            <nav aria-label={t('accountNav')} className="flex gap-1 overflow-x-auto px-4 py-3 md:block md:space-y-1 md:px-5 md:py-12 lg:px-7">
                {navigationItems.map(({ href, icon: Icon, label, paths }) => {
                    const active = paths.some((path) => currentPath.endsWith(path));

                    return (
                        <Link
                            className={`flex min-w-max items-center gap-3 rounded-md px-3 py-3 text-xs font-medium transition md:w-full ${active ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-600 hover:bg-white/70 hover:text-stone-950'}`}
                            href={href}
                            key={label}
                        >
                            <Icon aria-hidden="true" className={active ? 'text-[#bb915b]' : 'text-stone-500'} size={15} strokeWidth={1.8} />
                            {t(label)}
                        </Link>
                    );
                })}

                <div className="mt-6 border-t border-stone-200 pt-6">
                    <LanguageSwitcher />
                </div>

                <Link
                    aria-label={t('signOut')}
                    className="mt-6 flex min-w-max items-center gap-3 rounded-md px-3 py-3 text-xs font-medium text-stone-600 transition hover:bg-white/70 hover:text-stone-950 md:mt-4 md:w-full"
                    href={logout.url()}
                    method="post"
                    as="button"
                >
                    <LogOutIcon aria-hidden="true" className="text-stone-500" size={15} strokeWidth={1.8} />
                    {t('signOut')}
                </Link>
            </nav>
        </aside>
    );
}
