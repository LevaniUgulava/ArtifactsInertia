import { useMemo, useState } from 'react';
import type { Order } from '../types/ProfileTypes';

export type OrderStatusFilter = 'all' | 'Delivered' | 'In Transit';
export type OrderSort = 'newest' | 'oldest';

export function useOrderHistory(orders: Order[]) {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<OrderStatusFilter>('all');
    const [sort, setSort] = useState<OrderSort>('newest');
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const visibleOrders = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const matchingOrders = orders.filter((order) => {
            const matchesStatus = status === 'all' || order.status === status;
            const searchableText = `${order.id} ${order.date} ${order.itemCount} ${order.total}`.toLowerCase();

            return matchesStatus && (!normalizedQuery || searchableText.includes(normalizedQuery));
        });

        return [...matchingOrders].sort((firstOrder, secondOrder) => {
            const firstDate = new Date(firstOrder.date).getTime();
            const secondDate = new Date(secondOrder.date).getTime();

            return sort === 'newest' ? secondDate - firstDate : firstDate - secondDate;
        });
    }, [orders, query, sort, status]);

    function toggleExpandedOrder(orderId: string) {
        setExpandedOrderId((currentOrderId) => currentOrderId === orderId ? null : orderId);
    }

    return {
        expandedOrderId,
        query,
        setQuery,
        setSort,
        setStatus,
        sort,
        status,
        toggleExpandedOrder,
        visibleOrders,
    };
}
