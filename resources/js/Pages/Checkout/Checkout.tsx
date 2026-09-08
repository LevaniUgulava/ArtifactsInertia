import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import CheckoutLayout from '@/Layouts/CheckoutLayout';
import { CheckoutBenefits } from '@/Pages/Checkout/Components/CheckoutBenefits';
import { CheckoutBreadcrumb } from '@/Pages/Checkout/Components/CheckoutBreadcrumb';
import { CheckoutOrderSummary } from '@/Pages/Checkout/Components/CheckoutOrderSummary';
import { DeliveryMethods, type DeliveryMethod } from '@/Pages/Checkout/Components/DeliveryMethods';
import { PaymentDetails, type PaymentMethod } from '@/Pages/Checkout/Components/PaymentDetails';
import { ShippingInformation, type ShippingFields } from '@/Pages/Checkout/Components/ShippingInformation';
import checkout from '@/routes/checkout';

export type CheckoutItem = {
    id: string;
    name: string;
    variant: string;
    quantity: number;
    price: number;
    image: string;
};

type CheckoutPageProps = {
    status?: string;
    checkout: {
        customer: ShippingFields & { email: string };
        items: CheckoutItem[];
        deliveryMethods: DeliveryMethod[];
        paymentMethods: PaymentMethod[];
        taxRate: number;
    };
};

const currency = new Intl.NumberFormat('en-US', { currency: 'EUR', style: 'currency' });

function Checkout({ checkout: checkoutData, status }: CheckoutPageProps) {
    const form = useForm({
        first_name: checkoutData.customer.first_name,
        last_name: checkoutData.customer.last_name,
        address: checkoutData.customer.address,
        city: checkoutData.customer.city,
        postal_code: checkoutData.customer.postal_code,
        country: checkoutData.customer.country,
        phone: checkoutData.customer.phone,
        delivery_method: checkoutData.deliveryMethods[0]?.id ?? 'express',
        payment_method: checkoutData.paymentMethods[0]?.id ?? 'card',
        terms: false,
    });
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const subtotal = useMemo(() => checkoutData.items.reduce((total, item) => total + item.price * item.quantity, 0), [checkoutData.items]);
    const selectedDelivery = checkoutData.deliveryMethods.find((method) => method.id === form.data.delivery_method);
    const shipping = selectedDelivery?.price ?? 0;
    const discount = promoApplied ? 25 : 0;
    const tax = Math.max(0, (subtotal - discount) * checkoutData.taxRate);
    const total = subtotal + shipping + tax - discount;

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post(checkout.placeOrder.url(), { preserveScroll: true });
    }

    function updateShippingField(field: keyof ShippingFields, value: string) {
        form.setData(field, value);
    }

    function applyPromoCode() {
        setPromoApplied(promoCode.trim().toUpperCase() === 'ATELIER25');
    }

    return (
        <>
            <Head title="Checkout | Atelier Street" />
            <div className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <CheckoutBreadcrumb />
                {status === 'checkout-validated' && <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">Your checkout details were validated. Payment processing is not configured yet.</p>}

                <form className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <ShippingInformation data={form.data} errors={form.errors} onChange={updateShippingField} />
                        <DeliveryMethods methods={checkoutData.deliveryMethods} onChange={(id) => form.setData('delivery_method', id)} selected={form.data.delivery_method} />
                        <PaymentDetails methods={checkoutData.paymentMethods} onChange={(id) => form.setData('payment_method', id)} selected={form.data.payment_method} />
                    </div>

                    <div className="flex flex-col gap-5">
                        <CheckoutOrderSummary
                            discount={discount}
                            items={checkoutData.items}
                            onApplyPromo={applyPromoCode}
                            onPromoCodeChange={setPromoCode}
                            onTermsChange={(value) => form.setData('terms', value)}
                            processing={form.processing}
                            promoApplied={promoApplied}
                            promoCode={promoCode}
                            shipping={shipping}
                            subtotal={subtotal}
                            tax={tax}
                            terms={form.data.terms}
                            total={total}
                        />
                        <CheckoutBenefits />
                    </div>
                </form>

                <p className="mt-7 text-[10px] text-stone-400">Prices shown in EUR. Secure checkout protected by industry-standard encryption.</p>
            </div>
        </>
    );
}

Checkout.layout = CheckoutLayout;

export default Checkout;

export { currency };
