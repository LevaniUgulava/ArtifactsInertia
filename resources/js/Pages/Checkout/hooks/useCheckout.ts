import { useForm } from '@inertiajs/react';
import { useMemo, useState, type FormEvent } from 'react';
import { PROMO_CODE, PROMO_DISCOUNT } from '@/constants/promo';
import type { CheckoutData, ShippingFields } from '@/Pages/Checkout/CheckoutTypes';
import checkout from '@/routes/checkout';

export function useCheckout(checkoutData: CheckoutData) {
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

    return {
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
    };
}