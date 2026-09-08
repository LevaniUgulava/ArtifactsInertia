import { HeartIcon, Trash2Icon } from 'lucide-react';
import { QuantityControl } from '@/Pages/Cart/Components/QuantityControl';

const currency = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
});

export type CartItem = {
    id: string;
    name: string;
    price: number;
    size: string;
    color: string;
    colorHex: string;
    quantity: number;
    image: string;
};

type CartItemRowProps = {
    item: CartItem;
    onQuantityChange: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    onSave: (id: string) => void;
};

export function CartItemRow({ item, onQuantityChange, onRemove, onSave }: CartItemRowProps) {
    return (
        <article className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 sm:grid-cols-[104px_minmax(0,1fr)_auto] sm:gap-5 sm:p-5">
            <img alt={item.name} className="aspect-square w-24 rounded-md object-cover sm:w-[104px]" src={item.image} />

            <div className="flex min-w-0 flex-col justify-between gap-5">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4 sm:block">
                        <h2 className="text-sm font-semibold text-stone-950">{item.name}</h2>
                        <p className="text-sm font-semibold text-stone-950 sm:hidden">{currency.format(item.price)}</p>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                        <span>Size: {item.size}</span>
                        <span className="inline-flex items-center gap-2">
                            Color:
                            <span aria-hidden="true" className="size-3 rounded-full border border-stone-200" style={{ backgroundColor: item.colorHex }} />
                            {item.color}
                        </span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <QuantityControl onChange={(quantity) => onQuantityChange(item.id, quantity)} value={item.quantity} />
                    <button className="inline-flex items-center gap-1.5 text-xs text-stone-400 transition hover:text-stone-950" type="button" onClick={() => onSave(item.id)}>
                        <HeartIcon aria-hidden="true" size={14} strokeWidth={1.8} />
                        Save for later
                    </button>
                    <button className="inline-flex items-center gap-1.5 text-xs text-red-400 transition hover:text-red-600" type="button" onClick={() => onRemove(item.id)}>
                        <Trash2Icon aria-hidden="true" size={14} strokeWidth={1.8} />
                        Remove
                    </button>
                </div>
            </div>

            <p className="hidden text-sm font-semibold text-stone-950 sm:block">{currency.format(item.price)}</p>
        </article>
    );
}
