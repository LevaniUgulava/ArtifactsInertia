import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProfileLayout from '@/Layouts/ProfileLayout';
import { CartBenefits } from '@/Pages/Cart/Components/CartBenefits';
import { CartItemRow, type CartItem } from '@/Pages/Cart/Components/CartItemRow';
import { EmptyCart } from '@/Pages/Cart/Components/EmptyCart';
import { OrderSummary } from '@/Pages/Cart/Components/OrderSummary';
import { home } from '@/routes';

type CartPageProps = {
    cart: {
        shipping: number;
        taxRate: number;
        items: CartItem[];
    };
};

const currency = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    style: 'currency',
});

function Cart({ cart }: CartPageProps) {
    const { t } = useTranslation('cart');
    const [items, setItems] = useState(cart.items);
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const subtotal = useMemo(
        () => items.reduce((total, item) => total + item.price * item.quantity, 0),
        [items],
    );
    const discount = promoApplied ? 25 : 0;
    const tax = Math.max(0, (subtotal - discount) * cart.taxRate);
    const total = subtotal + cart.shipping + tax - discount;
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);

    function updateQuantity(id: string, quantity: number) {
        setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, quantity } : item));
    }

    function removeItem(id: string) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }

    function saveItem(id: string) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }

    function applyPromoCode() {
        setPromoApplied(promoCode.trim().toUpperCase() === 'ATELIER25');
    }

    return (
        <>
            <Head title={`${t('title')} | Atelier Street`} />

            <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <div className="mb-7 flex items-end justify-between gap-5">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight text-stone-950 sm:text-3xl">{t('title')}</h1>
                        <p className="text-xs text-stone-500">{t('item', { count: itemCount })}</p>
                    </div>
                    <Link className="hidden text-xs font-semibold text-[#b38145] transition hover:text-stone-950 sm:block" href={home.url()}>
                        {t('continueShopping')}
                    </Link>
                </div>

                {items.length > 0 ? (
                    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
                        <section aria-label={t('cartItemsLabel')} className="space-y-4">
                            {items.map((item) => (
                                <CartItemRow
                                    item={item}
                                    key={item.id}
                                    onQuantityChange={updateQuantity}
                                    onRemove={removeItem}
                                    onSave={saveItem}
                                />
                            ))}
                            <Link className="inline-flex text-xs font-semibold text-[#b38145] transition hover:text-stone-950 sm:hidden" href={home.url()}>
                                ← {t('continueShopping')}
                            </Link>
                        </section>

                        <div className="space-y-5">
                            <OrderSummary
                                discount={discount}
                                onApplyPromo={applyPromoCode}
                                onPromoCodeChange={setPromoCode}
                                promoApplied={promoApplied}
                                promoCode={promoCode}
                                shipping={cart.shipping}
                                subtotal={subtotal}
                                tax={tax}
                                total={total}
                            />
                            <CartBenefits />
                        </div>
                    </div>
                ) : (
                    <EmptyCart />
                )}
            </div>
        </>
    );
}

Cart.layout = ProfileLayout;

export default Cart;
