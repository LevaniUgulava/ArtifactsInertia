import { ShoppingBagIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { home } from '@/routes';

export function EmptyCart() {
    return (
        <section className="grid min-h-80 place-items-center rounded-xl border border-dashed border-stone-200 px-6 py-14 text-center">
            <div className="flex max-w-sm flex-col items-center gap-4">
                <span className="grid size-14 place-items-center rounded-full bg-[#f8f5f0] text-[#b38145]"><ShoppingBagIcon aria-hidden="true" size={23} strokeWidth={1.7} /></span>
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-stone-950">Your cart is empty</h2>
                    <p className="text-sm leading-6 text-stone-500">Discover considered pieces and add something special to your wardrobe.</p>
                </div>
                <Link className="rounded-md bg-[#bb915b] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#a77e4c]" href={home.url()}>
                    Continue Shopping
                </Link>
            </div>
        </section>
    );
}
