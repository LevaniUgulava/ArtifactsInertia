import { benefitIcons } from '../constants/benefitIcons';
import type { ProductBenefit, ProductBenefitsProps } from '../types/ProductTypes';

export function ProductBenefits({ benefits }: ProductBenefitsProps) {
    return (
        <ul className="space-y-3 border-t border-stone-200 pt-5 text-[10px] text-stone-600">
            {benefits.map((benefit) => {
                const Icon = benefitIcons[benefit.icon];

                return <li className="flex items-center gap-2.5" key={benefit.label}><Icon aria-hidden="true" className="text-amber-700" size={13} strokeWidth={1.8} />{benefit.label}</li>;
            })}
        </ul>
    );
}