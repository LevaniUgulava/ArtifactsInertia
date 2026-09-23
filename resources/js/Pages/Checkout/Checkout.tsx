import { Head, useForm } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import { gelFormatter } from '@/constants/format';
import { PROMO_CODE, PROMO_DISCOUNT } from '@/constants/promo';
import CheckoutLayout from '@/Layouts/CheckoutLayout';
import { CheckoutBenefits } from '@/Pages/Checkout/Components/CheckoutBenefits';
import { CheckoutBreadcrumb } from '@/Pages/Checkout/Components/CheckoutBreadcrumb';
import { CheckoutOrderSummary } from '@/Pages/Checkout/Components/CheckoutOrderSummary';
import { DeliveryMethods } from '@/Pages/Checkout/Components/DeliveryMethods';
import { PaymentDetails } from '@/Pages/Checkout/Components/PaymentDetails';
import { ShippingInformation } from '@/Pages/Checkout/Components/ShippingInformation';
import checkout from '@/routes/checkout';
import type { CheckoutPageProps, ShippingFields } from '@/Pages/Checkout/types/CheckoutTypes';

function Checkout({ checkout: checkoutData, status }: CheckoutPageProps) {
    const { t } = useTranslation('checkout');
    const form = useForm({
        first_name: checkoutData.customer.first_name,
        last_name: checkoutData.customer.last_name,
        address: checkoutData.customer.address,
        city: checkoutData.customer.city,
        phone: checkoutData.customer.phone,
        delivery_method: checkoutData.deliveryMethods[0]?.id ?? 'express',
        payment_method: checkoutData.paymentMethods[0]?.id ?? 'card',
        promo_code: checkoutData.promoCode ?? '',
        terms: false,
    });
    const [promoCode, setPromoCode] = useState(checkoutData.promoCode ?? '');
    const [promoApplied, setPromoApplied] = useState(checkoutData.promoCode !== null && checkoutData.promoCode.toUpperCase() === PROMO_CODE);

    const subtotal = useMemo(
        () => checkoutData.items.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0),
        [checkoutData.items],
    );
    const productCount = checkoutData.items.reduce((count, item) => count + (Number(item.quantity) || 0), 0);
    const selectedDelivery = checkoutData.deliveryMethods.find((method) => method.id === form.data.delivery_method);
    const shipping = Number(selectedDelivery?.price) || 0;
    const discount = promoApplied ? PROMO_DISCOUNT : 0;
    const total = Math.max(0, subtotal + shipping - discount);
    const formComplete = Boolean(
        form.data.first_name.trim() &&
        form.data.last_name.trim() &&
        form.data.address.trim() &&
        form.data.city.trim() &&
        form.data.phone.trim().length > 4 &&
        form.data.delivery_method &&
        form.data.payment_method,
    );

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.post(checkout.placeOrder.url(), { preserveScroll: true });
    }

    function updateShippingField(field: keyof ShippingFields, value: string) {
        form.setData(field, value);
    }

    function applyPromoCode() {
        setPromoApplied(promoCode.trim().toUpperCase() === PROMO_CODE);
    }

    return (
        <>
            <Head title={brandTitle(t('title'))} />
            <div className="mx-auto w-full max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <CheckoutBreadcrumb />
                {status === 'checkout-validated' && <p className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">{t('validatedNotice')}</p>}

                <form className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-start" onSubmit={submit}>
                    <div className="flex flex-col gap-6">
                        <ShippingInformation data={form.data} errors={form.errors} onChange={updateShippingField} />
                        <DeliveryMethods methods={checkoutData.deliveryMethods} onChange={(id) => form.setData('delivery_method', id)} selected={form.data.delivery_method} />
                        <PaymentDetails methods={checkoutData.paymentMethods} onChange={(id) => form.setData('payment_method', id)} selected={form.data.payment_method} />
                    </div>

                    <div className="flex flex-col gap-5">
                        <CheckoutOrderSummary
                            discount={discount}
                            formComplete={formComplete}
                            items={checkoutData.items}
                            onApplyPromo={applyPromoCode}
                            onPromoCodeChange={setPromoCode}
                            onTermsChange={(value) => form.setData('terms', value)}
                            processing={form.processing}
                            productCount={productCount}
                            promoApplied={promoApplied}
                            promoCode={promoCode}
                            shipping={shipping}
                            subtotal={subtotal}
                            terms={form.data.terms}
                            total={total}
                        />
                        <CheckoutBenefits />
                    </div>
                </form>

                <p className="mt-7 text-[10px] text-stone-400">{t('eurNote')}</p>
            </div>
        </>
    );
}

Checkout.layout = CheckoutLayout;

export default Checkout;