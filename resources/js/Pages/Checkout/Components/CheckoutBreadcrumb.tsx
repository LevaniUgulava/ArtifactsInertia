import { ChevronRightIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { cart } from '@/routes';

export function CheckoutBreadcrumb() {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] text-stone-500">
            <Link className="transition hover:text-stone-950" href={cart.url()}>Cart</Link>
            <ChevronRightIcon aria-hidden="true" size={12} />
            <span className="font-semibold text-stone-950">Checkout</span>
        </nav>
    );
}
