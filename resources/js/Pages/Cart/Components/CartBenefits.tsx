import { LockKeyholeIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';

export function CartBenefits() {
    return (
        <div className="space-y-3 px-2 text-xs text-stone-500">
            <p className="flex items-center gap-2"><LockKeyholeIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} /> Secure checkout and protected payment</p>
            <p className="flex items-center gap-2"><RotateCcwIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} /> Easy returns and exchanges</p>
            <p className="flex items-center gap-2"><TruckIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} /> Free shipping on orders over $500</p>
        </div>
    );
}
