export type DeliveryMethod = {
    id: string;
    label: string;
    description: string;
    icon: string;
    price: number;
};

export type PaymentMethod = {
    id: string;
    label: string;
};

export type ShippingFields = {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    phone: string;
};

export type CheckoutItem = {
    id: string;
    name: string;
    size: string;
    color: string;
    colorHex?: string;
    quantity: number;
    price: number;
    image: string;
};

export type CheckoutPageProps = {
    status?: string;
    checkout: {
        customer: ShippingFields & { email: string };
        items: CheckoutItem[];
        deliveryMethods: DeliveryMethod[];
        paymentMethods: PaymentMethod[];
        promoCode: string | null;
    };
};

export type ShippingInformationProps = {
    data: ShippingFields;
    errors: Record<string, string | undefined>;
    onChange: (field: keyof ShippingFields, value: string) => void;
};

export type DeliveryMethodsProps = {
    methods: DeliveryMethod[];
    selected: string;
    onChange: (id: string) => void;
};

export type PaymentDetailsProps = {
    methods: PaymentMethod[];
    selected: string;
    onChange: (id: string) => void;
};

export type CheckoutOrderSummaryProps = {
    discount: number;
    items: CheckoutItem[];
    onApplyPromo: () => void;
    onPromoCodeChange: (value: string) => void;
    productCount: number;
    promoApplied: boolean;
    promoCode: string;
    shipping: number;
    subtotal: number;
    total: number;
    terms: boolean;
    onTermsChange: (value: boolean) => void;
    processing: boolean;
    formComplete: boolean;
};