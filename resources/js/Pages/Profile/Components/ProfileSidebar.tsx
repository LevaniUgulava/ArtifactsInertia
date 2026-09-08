import { Link, usePage } from '@inertiajs/react';
import { HomeIcon, LayoutGridIcon, PackageIcon, ShoppingBagIcon, UserRoundIcon, WalletCardsIcon } from 'lucide-react';
import { cart, home, profile } from '@/routes';

const navigationItems = [
    { label: 'Home', icon: HomeIcon, href: home.url(), paths: ['/en'] },
    { label: 'Catalog', icon: LayoutGridIcon, href: home.url(), paths: [] },
    { label: 'Products', icon: PackageIcon, href: home.url(), paths: [] },
    { label: 'Cart', icon: ShoppingBagIcon, href: cart.url(), paths: ['/cart'] },
    { label: 'Checkout', icon: WalletCardsIcon, href: home.url(), paths: [] },
    { label: 'Profile', icon: UserRoundIcon, href: profile.url(), paths: ['/profile', '/account'] },
];

export function ProfileSidebar() {
    const { url } = usePage();
    const currentPath = url.split('?')[0];

    return (
        <aside className="w-full shrink-0 border-b border-stone-200 bg-[#f8f5f0] md:w-56 md:border-b-0 md:border-r lg:w-64">
            <nav aria-label="Account navigation" className="flex gap-1 overflow-x-auto px-4 py-3 md:block md:space-y-1 md:px-5 md:py-12 lg:px-7">
                {navigationItems.map(({ href, icon: Icon, label, paths }) => {
                    const active = paths.some((path) => currentPath.endsWith(path));

                    return (
                        <Link
                            className={`flex min-w-max items-center gap-3 rounded-md px-3 py-3 text-xs font-medium transition md:w-full ${active ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-600 hover:bg-white/70 hover:text-stone-950'}`}
                            href={href}
                            key={label}
                        >
                            <Icon aria-hidden="true" className={active ? 'text-[#bb915b]' : 'text-stone-500'} size={15} strokeWidth={1.8} />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
