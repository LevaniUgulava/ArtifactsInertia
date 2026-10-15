export type CartItem = {
    id: string;
    name: string;
    price: number;
    size: string;
    color: string;
    colorHex: string;
    quantity: number;
    image: string;
};

export type CartPageProps = {
    cart: {
        shipping: number;
        items: CartItem[];
    };
};

export type CartItemRowProps = {
    error?: string;
    item: CartItem;
    onQuantityChange: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    onSave: (id: string) => void;
};

export type OrderSummaryProps = {
    discount: number;
    onApplyPromo: () => void;
    onPromoCodeChange: (value: string) => void;
    productCount: number;
    promoApplied: boolean;
    promoCode: string;
    shipping: number;
    subtotal: number;
    total: number;
};

export type QuantityControlProps = {
    onChange: (quantity: number) => void;
    value: number;
};