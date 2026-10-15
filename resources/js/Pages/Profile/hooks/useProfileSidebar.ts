import { usePage } from '@inertiajs/react';
import { HeartIcon, HomeIcon, ListOrderedIcon, ShoppingBagIcon, UserRoundIcon } from 'lucide-react';
import type { ProfileSidebarPageProps } from '@/Pages/Profile/ProfileTypes';
import { cart, favorites, home, profile } from '@/routes';

export function useProfileSidebar() {
    const { url, props } = usePage<ProfileSidebarPageProps>();
    const lang = props.locale ?? 'ka';
    const currentPath = url.split('?')[0];
    const isOrdersView = new URLSearchParams(url.split('?')[1] ?? '').get('section') === 'orders';

    const navigationItems = [
        { label: 'navHome', icon: HomeIcon, href: home.url({ lang }), paths: [`/${lang}`] },
        { label: 'navCart', icon: ShoppingBagIcon, href: cart.url({ lang }), paths: ['/cart'] },
        { label: 'navOrders', icon: ListOrderedIcon, href: profile.url({ lang }, { query: { section: 'orders' } }), paths: [] },
        { label: 'navFavorites', icon: HeartIcon, href: favorites.url({ lang }), paths: ['/favorites'] },
        { label: 'navProfile', icon: UserRoundIcon, href: profile.url({ lang }), paths: ['/profile', '/account'] },
    ];

    function isActive(label: string, paths: string[]): boolean {
        return label === 'navOrders' ? isOrdersView : !isOrdersView && paths.some((path) => currentPath.endsWith(path));
    }

    return { navigationItems, isActive };
}