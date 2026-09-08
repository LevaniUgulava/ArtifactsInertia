import { Link } from '@inertiajs/react';
import { LockKeyholeIcon } from 'lucide-react';
import { checkout } from '@/routes';

const currency = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
});

type OrderSummaryProps = {
    discount: number;
    onApplyPromo: () => void;
    onPromoCodeChange: (value: string) => void;
    promoApplied: boolean;
    promoCode: string;
    shipping: number;
    subtotal: number;
    tax: number;
    total: number;
};

export function OrderSummary({ discount, onApplyPromo, onPromoCodeChange, promoApplied, promoCode, shipping, subtotal, tax, total }: OrderSummaryProps) {
    return (
        <section className="rounded-xl bg-[#f8f5f0] p-5 sm:p-6">
            <h2 className="text-base font-bold text-stone-950">Order Summary</h2>

            <dl className="mt-6 space-y-4 text-xs">
                <div className="flex items-center justify-between gap-4 text-stone-500">
                    <dt>Subtotal</dt>
                    <dd className="font-semibold text-stone-700">{currency.format(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 text-stone-500">
                    <dt>Estimated Shipping</dt>
                    <dd className="font-semibold text-stone-700">{currency.format(shipping)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 text-stone-500">
                    <dt>Tax</dt>
                    <dd className="font-semibold text-stone-700">{currency.format(tax)}</dd>
                </div>
                {discount > 0 && (
                    <div className="flex items-center justify-between gap-4 text-emerald-600">
                        <dt>Atelier25 discount</dt>
                        <dd className="font-semibold">-{currency.format(discount)}</dd>
                    </div>
                )}
            </dl>

            <div className="mt-6 border-t border-stone-200 pt-5">
                <label className="text-xs font-medium text-stone-700" htmlFor="promo-code">Promo Code</label>
                <div className="mt-2 flex gap-2">
                    <input
                        className="min-w-0 flex-1 rounded-md border border-stone-200 bg-white px-3 py-2.5 text-xs outline-none transition placeholder:text-stone-400 focus:border-[#bb915b] focus:ring-2 focus:ring-[#bb915b]/20"
                        id="promo-code"
                        placeholder="Enter code"
                        type="text"
                        value={promoCode}
                        onChange={(event) => onPromoCodeChange(event.target.value)}
                    />
                    <button className="rounded-md bg-[#b88b52] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#a77e4c]" type="button" onClick={onApplyPromo}>Apply</button>
                </div>
                {promoCode.length > 0 && !promoApplied && <p className="mt-2 text-[11px] text-stone-500">Use ATELIER25 for $25 off.</p>}
                {promoApplied && <p className="mt-2 text-[11px] text-emerald-600">Promo code applied.</p>}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                <span className="text-sm font-bold text-stone-950">Total</span>
                <span className="text-lg font-bold text-stone-950">{currency.format(total)}</span>
            </div>

            <Link className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-stone-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700" href={checkout.url()}>
                Proceed to Checkout
            </Link>

            <div className="mt-6 flex items-center gap-2 text-[10px] text-stone-500">
                <LockKeyholeIcon aria-hidden="true" className="shrink-0 text-[#b38145]" size={14} />
                Secure 256-bit SSL encrypted checkout
            </div>
        </section>
    );
}
