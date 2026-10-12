import { Link, usePage } from '@inertiajs/react';
import { Boxes, ChevronRight, FolderKanban, Images, LayoutDashboard, LogOut, Package, Tags } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BrandLockup } from '@/Components/Brand/Brand';
import { logout } from '@/routes';
import admin from '@/routes/admin';

type AdminNavItem = {
    icon: typeof LayoutDashboard;
    label: string;
    href: string;
};

export function AdminSidebar() {
    const { t } = useTranslation('admin');
    const { url } = usePage();
    const currentPath = url.split('?')[0];
    const navigationItems: AdminNavItem[] = [
        { icon: LayoutDashboard, label: 'dashboard', href: admin.dashboard.url() },
        { icon: Package, label: 'products', href: admin.products.index.url() },
        { icon: Tags, label: 'categories', href: admin.categories.index.url() },
        { icon: FolderKanban, label: 'collections', href: admin.collections.index.url() },
        { icon: Images, label: 'media', href: admin.media.index.url() },
    ];

    return (
        <aside className="flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 lg:block lg:px-7 lg:py-8">
                <BrandLockup className="text-slate-950" />
                <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 lg:block lg:pl-12">Admin</span>
            </div>

            <nav aria-label={t('navigation')} className="flex gap-2 overflow-x-auto px-4 py-4 lg:flex-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-5 lg:py-10">
                {navigationItems.map(({ icon: Icon, label, href }) => {
                    const active = currentPath === href || (label !== 'dashboard' && currentPath.startsWith(`${href}/`));
                    const className = `group flex min-h-11 min-w-max items-center gap-3 rounded-xl px-4 text-sm font-semibold transition ${active ? 'bg-slate-950 text-white shadow-[0_10px_24px_-14px_rgba(15,23,42,0.8)]' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`;

                    return (
                        <Link className={className} href={href} key={label}>
                            <Icon aria-hidden="true" className={active ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-950'} size={18} strokeWidth={1.8} />
                            <span>{t(label)}</span>
                            {active ? <ChevronRight aria-hidden="true" className="ml-auto text-cyan-300" size={17} /> : null}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-200 p-4 lg:p-5">
                <Link
                    aria-label={t('signOut')}
                    className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
                    href={logout.url()}
                    method="post"
                    as="button"
                >
                    <LogOut aria-hidden="true" size={18} strokeWidth={1.8} />
                    {t('signOut')}
                </Link>
            </div>
        </aside>
    );
}
