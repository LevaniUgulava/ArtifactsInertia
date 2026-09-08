import { LockKeyholeIcon, RotateCcwIcon, TruckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function CartBenefits() {
    const { t } = useTranslation('cart');

    return (
        <div className="space-y-3 px-2 text-xs text-stone-500">
            <p className="flex items-center gap-2"><LockKeyholeIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} /> {t('secureCheckoutBenefit')}</p>
            <p className="flex items-center gap-2"><RotateCcwIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} /> {t('easyReturnsBenefit')}</p>
            <p className="flex items-center gap-2"><TruckIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} /> {t('freeShippingBenefit')}</p>
        </div>
    );
}
