import { ArrowLeftIcon, ChevronDownIcon, SearchIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useOrderHistory, type OrderSort, type OrderStatusFilter } from '../hooks/useOrderHistory';
import { statusKeys } from '../constants/statusKeys';
import type { Order } from '../types/ProfileTypes';
import { profile } from '@/routes';
import { useLocale } from '@/hooks/useLocale';
import { Link } from '@inertiajs/react';

type OrdersViewProps = {
    orders: Order[];
};

function localizeItemCount(t: (key: string, opts?: Record<string, unknown>) => string, itemCount: string): string {
    const match = itemCount.match(/(\d+)/);
    if (!match) return itemCount;

    return t(Number(match[1]) === 1 ? 'itemCount' : 'itemsCount', { count: match[1] });
}

export function OrdersView({ orders }: OrdersViewProps) {
    const { t } = useTranslation('profile');
    const lang = useLocale();
    const {
        expandedOrderId,
        query,
        setQuery,
        setSort,
        setStatus,
        sort,
        status,
        toggleExpandedOrder,
        visibleOrders,
    } = useOrderHistory(orders);

    const statusOptions: { label: string; value: OrderStatusFilter }[] = [
        { label: t('allStatuses'), value: 'all' },
        { label: t('delivered'), value: 'Delivered' },
        { label: t('inTransit'), value: 'In Transit' },
    ];

    const sortOptions: { label: string; value: OrderSort }[] = [
        { label: t('newestOrders'), value: 'newest' },
        { label: t('oldestOrders'), value: 'oldest' },
    ];

    return (
        <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <Link className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#b38145] transition hover:text-stone-950" href={profile.url({ lang })}>
                        <ArrowLeftIcon aria-hidden="true" size={13} />
                        {t('backToProfile')}
                    </Link>
                    <h1 className="text-xl font-semibold tracking-tight text-stone-950 sm:text-2xl">{t('ordersTitle')}</h1>
                    <p className="mt-1 text-xs text-stone-500">{t('ordersDescription')}</p>
                </div>
                <p className="text-xs text-stone-500">{t('ordersCount', { count: visibleOrders.length })}</p>
            </div>

            <div className="grid gap-3 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
                <label className="relative block">
                    <span className="sr-only">{t('searchOrders')}</span>
                    <SearchIcon aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                    <input className="min-h-10 w-full rounded-lg border border-stone-200 bg-stone-50 pl-9 pr-3 text-xs text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#bb915b] focus:bg-white focus:ring-2 focus:ring-[#bb915b]/20" placeholder={t('searchOrders')} type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
                </label>
                <label className="relative block">
                    <span className="sr-only">{t('filterByStatus')}</span>
                    <select className="min-h-10 w-full appearance-none rounded-lg border border-stone-200 bg-stone-50 px-3 pr-9 text-xs text-stone-700 outline-none transition focus:border-[#bb915b] focus:bg-white focus:ring-2 focus:ring-[#bb915b]/20" value={status} onChange={(event) => setStatus(event.target.value as OrderStatusFilter)}>
                        {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={13} />
                </label>
                <label className="relative block">
                    <span className="sr-only">{t('sortOrders')}</span>
                    <select className="min-h-10 w-full appearance-none rounded-lg border border-stone-200 bg-stone-50 px-3 pr-9 text-xs text-stone-700 outline-none transition focus:border-[#bb915b] focus:bg-white focus:ring-2 focus:ring-[#bb915b]/20" value={sort} onChange={(event) => setSort(event.target.value as OrderSort)}>
                        {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                    <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" size={13} />
                </label>
            </div>

            {visibleOrders.length > 0 ? (
                <div className="space-y-3">
                    {visibleOrders.map((order) => {
                        const isExpanded = expandedOrderId === order.id;

                        return (
                            <article className="overflow-hidden rounded-xl border border-stone-200 bg-white" key={order.id}>
                                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5">
                                    <img alt="" className="size-16 rounded-lg object-cover sm:size-20" src={order.image} />
                                    <div className="min-w-0 flex-1">
                                        <h2 className="text-xs font-semibold text-stone-900">{t('orderNumber', { number: order.id })}</h2>
                                        <p className="mt-1 text-[10px] text-stone-500">{order.date} · {localizeItemCount(t, order.itemCount)}</p>
                                    </div>
                                    <p className={`text-[10px] font-semibold ${order.statusTone === 'success' ? 'text-emerald-600' : 'text-blue-600'}`}>{t(statusKeys[order.status] ?? order.status, { defaultValue: order.status })}</p>
                                    <p className="text-xs font-semibold text-stone-700 sm:w-20 sm:text-right">{order.total}</p>
                                    <button aria-expanded={isExpanded} className="inline-flex items-center justify-center gap-1 rounded-md border border-[#d7b37d] px-4 py-2 text-[10px] font-medium text-[#b38145] transition hover:bg-[#fbf5ec]" onClick={() => toggleExpandedOrder(order.id)} type="button">
                                        {isExpanded ? t('hideDetails') : t('details')}
                                        <ChevronDownIcon aria-hidden="true" className={`transition ${isExpanded ? 'rotate-180' : ''}`} size={12} />
                                    </button>
                                </div>
                                {isExpanded ? <div className="grid gap-3 border-t border-stone-100 bg-stone-50 px-4 py-4 text-[10px] text-stone-600 sm:grid-cols-3 sm:px-5">
                                    <p><span className="block font-semibold text-stone-900">{t('orderSummary')}</span>{localizeItemCount(t, order.itemCount)}</p>
                                    <p><span className="block font-semibold text-stone-900">{t('shippingStatus')}</span>{t(statusKeys[order.status] ?? order.status, { defaultValue: order.status })}</p>
                                    <p><span className="block font-semibold text-stone-900">{t('orderTotal')}</span>{order.total}</p>
                                </div> : null}
                            </article>
                        );
                    })}
                </div>
            ) : <div className="rounded-xl border border-dashed border-stone-300 bg-white px-5 py-16 text-center text-sm text-stone-500">{t('noMatchingOrders')}</div>}
        </section>
    );
}
