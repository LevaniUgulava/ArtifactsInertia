import { BellIcon, CreditCardIcon, MapPinIcon } from 'lucide-react';

export const settings = [
    {
        title: 'addressBook',
        icon: MapPinIcon,
        lines: ['addressLine1', 'addressLine2', 'addressLine3'],
        action: 'editAddresses',
    },
    {
        title: 'paymentMethods',
        icon: CreditCardIcon,
        lines: ['paymentLine1', 'paymentLine2', 'paymentLine3'],
        action: 'managePayments',
    },
    {
        title: 'preferences',
        icon: BellIcon,
        lines: ['preferenceLine1', 'preferenceLine2', 'preferenceLine3'],
        action: 'editSettings',
    },
];