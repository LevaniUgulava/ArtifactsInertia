import { usePage } from '@inertiajs/react';
import { FolderKanban, Images, LayoutDashboard, MessagesSquare, Package, Tags } from 'lucide-react';
import { useState } from 'react';
import type { AdminNavItem } from '@/Layouts/Admin/AdminSidebar/AdminSidebarTypes';
import admin from '@/routes/admin';

export function useAdminSidebar() {
    const { url } = usePage();
    const currentPath = url.split('?')[0];
    const [isOpen, setIsOpen] = useState(false);

    const navigationItems: AdminNavItem[] = [
        { icon: LayoutDashboard, label: 'dashboard', href: admin.dashboard.url() },
        { icon: Package, label: 'products', href: admin.products.index.url() },
        { icon: Tags, label: 'categories', href: admin.categories.index.url() },
        { icon: FolderKanban, label: 'collections', href: admin.collections.index.url() },
        { icon: Images, label: 'media', href: admin.media.index.url() },
        { icon: MessagesSquare, label: 'chat', href: admin.chat.index.url() },
    ];

    function toggleSidebar() {
        setIsOpen((previous) => !previous);
    }

    function isActive(label: string, href: string): boolean {
        return currentPath === href || (label !== 'dashboard' && currentPath.startsWith(`${href}/`));
    }

    return { isOpen, navigationItems, toggleSidebar, isActive };
}