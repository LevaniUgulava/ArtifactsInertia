import { Link } from '@inertiajs/react';
import { ChevronRight, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BrandLockup } from '@/Components/Brand/Brand';
import { useAdminSidebar } from '@/Layouts/Admin/AdminSidebar/hooks/useAdminSidebar';
import { cn } from '@/lib/utils';
import { logout } from '@/routes';

export function AdminSidebar() {
    const { t } = useTranslation('admin');
    const { isOpen, navigationItems, toggleSidebar, isActive } = useAdminSidebar();

    return (
        <aside className={cn('flex w-full shrink-0 flex-col border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r', {
            'lg:w-22': !isOpen,
            'lg:w-64': isOpen,
        })}>
            <div className="border-b border-slate-200 px-5 py-5 lg:px-7">
                <button aria-expanded={isOpen} aria-label="Toggle admin navigation" className="flex w-full items-center justify-between text-left" onClick={toggleSidebar} type="button">
                    <BrandLockup className="text-slate-950" />
                    <ChevronRight aria-hidden="true" className={cn('hidden text-slate-400 transition-transform lg:block', { 'rotate-180': isOpen })} size={17} />
                </button>
            </div>

            <nav aria-label={t('navigation')} className="flex gap-2 overflow-x-auto px-4 py-4 lg:flex-1 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-5 lg:py-10">
                {navigationItems.map(({ icon: Icon, label, href }) => {
                    const active = isActive(label, href);
                    const className = cn('group flex min-h-11 min-w-max items-center gap-3 rounded-xl px-4 text-sm font-semibold transition', {
                        'bg-slate-950 text-white': active,
                        'text-slate-600 hover:bg-slate-100 hover:text-slate-950': !active,
                    });

                    return (
                        <Link className={className} href={href} key={label}>
                            <Icon aria-hidden="true" className={cn('text-slate-400 ', { 'text-cyan-300': active })} size={18} strokeWidth={1.8} />
                            {isOpen && <div className="flex flex-1 items-center">
                                <span>{t(label)}</span>
                                {active ? <ChevronRight aria-hidden="true" className="ml-auto text-cyan-300" size={17} /> : null}
                            </div>}
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
                    {isOpen && <span>{t('signOut')}</span>}
                </Link>
            </div>
        </aside>
    );
}