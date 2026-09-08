import { CheckIcon, TruckIcon } from 'lucide-react';

export type DeliveryMethod = {
    id: string;
    label: string;
    description: string;
    price: number;
};

type DeliveryMethodsProps = {
    methods: DeliveryMethod[];
    selected: string;
    onChange: (id: string) => void;
};

const currency = new Intl.NumberFormat('en-US', { currency: 'EUR', style: 'currency' });

export function DeliveryMethods({ methods, onChange, selected }: DeliveryMethodsProps) {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <h2 className="text-sm font-bold text-stone-950 sm:text-base">Delivery Method</h2>
            <div className="mt-5 flex flex-col gap-3">
                {methods.map((method) => {
                    const isSelected = selected === method.id;

                    return (
                        <button aria-checked={isSelected} className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left transition ${isSelected ? 'border-[#d7b37d] bg-[#fffcf7]' : 'border-stone-200 hover:border-stone-300'}`} key={method.id} role="radio" type="button" onClick={() => onChange(method.id)}>
                            <span className={`grid size-4 shrink-0 place-items-center rounded-full border ${isSelected ? 'border-[#b38145] bg-[#b38145] text-white' : 'border-stone-300 text-transparent'}`}>
                                <CheckIcon aria-hidden="true" size={10} strokeWidth={3} />
                            </span>
                            <TruckIcon aria-hidden="true" className={isSelected ? 'text-[#b38145]' : 'text-stone-400'} size={16} strokeWidth={1.7} />
                            <span className="min-w-0 flex-1">
                                <span className="block text-xs font-semibold text-stone-800">{method.label}</span>
                                <span className="mt-1 block text-[10px] font-normal text-stone-400">{method.description}</span>
                            </span>
                            <span className="text-xs font-semibold text-stone-700">{method.price > 0 ? currency.format(method.price) : 'Free'}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
