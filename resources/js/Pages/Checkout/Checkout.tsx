import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { brandTitle } from '@/constants/brand';
import CheckoutLayout from '@/Layouts/CheckoutLayout';
import { CheckoutBenefits } from '@/Pages/Checkout/Components/CheckoutBenefits';
import { CheckoutBreadcrumb } from '@/Pages/Checkout/Components/CheckoutBreadcrumb';
import { CheckoutOrderSummary } from '@/Pages/Checkout/Components/CheckoutOrderSummary';
import { DeliveryMethods } from '@/Pages/Checkout/Components/DeliveryMethods';
import { PaymentDetails } from '@/Pages/Checkout/Components/PaymentDetails';
import { ShippingInformation } from '@/Pages/Checkout/Components/ShippingInformation';
import { useCheckout } from '@/Pages/Checkout/hooks/useCheckout';
import type { CheckoutPageProps } from '@/Pages/Checkout/CheckoutTypes';

function Checkout({ checkout: checkoutData, status }: CheckoutPageProps) {
    const { t } = useTranslation('checkout');
    const {
        form,
        promoCode,
        setPromoCode,
        promoApplied,
        subtotal,
        shipping,
        discount,
        total,
        productCount,
        formComplete,
        submit,
        updateShippingField,
        applyPromoCode,
    } = useCheckout(checkoutData);

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