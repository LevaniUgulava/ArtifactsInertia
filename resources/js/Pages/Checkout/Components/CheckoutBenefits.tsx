import { GiftIcon, HeadphonesIcon, RotateCcwIcon } from 'lucide-react';

export function CheckoutBenefits() {
    return (
        <section className="rounded-xl bg-[#f8f5f0] p-5 sm:p-6">
            <div className="flex flex-col gap-4 text-[10px] font-semibold text-stone-700">
                <p className="flex items-center gap-2"><GiftIcon aria-hidden="true" className="text-[#b38145]" size={14} /> Complimentary gift wrapping</p>
                <p className="flex items-center gap-2"><RotateCcwIcon aria-hidden="true" className="text-[#b38145]" size={14} /> 30-day hassle-free returns</p>
                <p className="flex items-center gap-2"><HeadphonesIcon aria-hidden="true" className="text-[#b38145]" size={14} /> Dedicated concierge support</p>
            </div>
        </section>
    );
}
