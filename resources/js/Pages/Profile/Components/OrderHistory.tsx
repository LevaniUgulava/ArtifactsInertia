import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '@/Pages/Profile/Components/SectionHeading';

export type Order = {
    id: string;
    date: string;
    itemCount: string;
    status: string;
    statusTone: 'success' | 'info';
    total: string;
    image: string;
};

export function OrderHistory({ orders }: { orders: Order[] }) {
    return (
        <section>
            <SectionHeading
                action={<button className="inline-flex items-center gap-1 text-[11px] font-medium text-[#b38145] transition hover:text-stone-950" type="button">View All Orders <ArrowRightIcon aria-hidden="true" size={12} /></button>}
                title="Order History"
            />

            {orders.length > 0 ? (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <article className="flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-3 sm:flex-row sm:items-center sm:gap-5 sm:p-4" key={order.id}>
                            <img alt="" className="size-16 rounded-md object-cover sm:size-14" src={order.image} />
                            <div className="min-w-0 flex-1">
                                <h3 className="text-xs font-semibold text-stone-900">Order {order.id}</h3>
                                <p className="mt-1 text-[10px] text-stone-500">{order.date} · {order.itemCount}</p>
                            </div>
                            <p className={`text-[10px] font-semibold ${order.statusTone === 'success' ? 'text-emerald-600' : 'text-blue-600'}`}>{order.status}</p>
                            <p className="text-xs font-semibold text-stone-700 sm:w-20 sm:text-right">{order.total}</p>
                            <button className="rounded-md border border-[#d7b37d] px-4 py-2 text-[10px] font-medium text-[#b38145] transition hover:bg-[#fbf5ec]" type="button">Details</button>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="rounded-lg border border-dashed border-stone-200 px-5 py-8 text-center text-sm text-stone-500">Your order history will appear here.</p>
            )}
        </section>
    );
}
