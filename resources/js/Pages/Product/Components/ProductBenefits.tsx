import { RotateCcwIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';
import type { ProductBenefit } from './ProductTypes';

const icons = {
    truck: TruckIcon,
    rotate: RotateCcwIcon,
    shield: ShieldCheckIcon,
};

export function ProductBenefits({ benefits }: { benefits: ProductBenefit[] }) {
    return (
        <ul className="space-y-3 border-t border-stone-200 pt-5 text-[10px] text-stone-600">
            {benefits.map((benefit) => {
                const Icon = icons[benefit.icon];

                return <li className="flex items-center gap-2.5" key={benefit.label}><Icon aria-hidden="true" className="text-amber-700" size={13} strokeWidth={1.8} />{benefit.label}</li>;
            })}
        </ul>
    );
}
