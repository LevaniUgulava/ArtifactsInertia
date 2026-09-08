import { AppleIcon, CreditCardIcon, LandmarkIcon, WalletCardsIcon } from 'lucide-react';

export type PaymentMethod = {
    id: string;
    label: string;
};

type PaymentDetailsProps = {
    methods: PaymentMethod[];
    selected: string;
    onChange: (id: string) => void;
};

const icons = {
    apple_pay: AppleIcon,
    card: CreditCardIcon,
    google_pay: LandmarkIcon,
    paypal: WalletCardsIcon,
};

export function PaymentDetails({ methods, onChange, selected }: PaymentDetailsProps) {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-bold text-stone-950 sm:text-base">Payment Details</h2>
                <span className="text-[10px] text-stone-400">Secure payment</span>
            </div>

            <div aria-label="Payment method" className="mt-5 flex flex-wrap gap-2" role="radiogroup">
                {methods.map((method) => {
                    const Icon = icons[method.id as keyof typeof icons];
                    const isSelected = selected === method.id;

                    return (
                        <button aria-checked={isSelected} className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[10px] font-semibold transition ${isSelected ? 'border-[#b38145] bg-[#fffaf2] text-stone-800' : 'border-stone-200 text-stone-500 hover:border-stone-300'}`} key={method.id} role="radio" type="button" onClick={() => onChange(method.id)}>
                            <Icon aria-hidden="true" size={13} strokeWidth={1.8} />
                            {method.label}
                        </button>
                    );
                })}
            </div>

            {selected === 'card' && (
                <div className="mt-5 flex flex-col gap-4">
                    <label className="flex flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor="card-number">
                        Card Number
                        <span className="flex min-h-11 items-center justify-between rounded-md border border-stone-200 bg-stone-50 px-3 text-xs font-normal text-stone-600">
                            <input aria-label="Card number" className="min-w-0 flex-1 bg-transparent outline-none" id="card-number" readOnly value="4242 •••• •••• 8901" />
                            <span className="text-[9px] font-bold text-blue-600">VISA</span>
                        </span>
                    </label>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <label className="flex min-w-0 flex-1 flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor="expiry-date">
                            Expiry Date
                            <input className="min-h-11 rounded-md border border-stone-200 bg-stone-50 px-3 text-xs text-stone-600 outline-none" id="expiry-date" readOnly value="09/27" />
                        </label>
                        <label className="flex min-w-0 flex-1 flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor="cvv">
                            CVV
                            <input className="min-h-11 rounded-md border border-stone-200 bg-stone-50 px-3 text-xs text-stone-600 outline-none" id="cvv" readOnly value="•••" />
                        </label>
                    </div>
                    <label className="flex flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor="name-on-card">
                        Name on Card
                        <input className="min-h-11 rounded-md border border-stone-200 bg-stone-50 px-3 text-xs text-stone-600 outline-none" id="name-on-card" readOnly value="Camille Rousseau" />
                    </label>
                    <p className="text-[10px] leading-4 text-stone-400">Payment details are masked in this preview and are not sent to the application.</p>
                </div>
            )}
        </section>
    );
}
