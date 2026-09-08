import { BellIcon, CreditCardIcon, MapPinIcon } from 'lucide-react';
import { SectionHeading } from '@/Pages/Profile/Components/SectionHeading';

const settings = [
    {
        title: 'Address Book',
        icon: MapPinIcon,
        lines: ['47 Rue de la Paix', 'Paris, 75002', 'France'],
        action: 'Edit Addresses',
    },
    {
        title: 'Payment Methods',
        icon: CreditCardIcon,
        lines: ['Visa ending in 4829', 'Expires 09/2026', 'Default payment method'],
        action: 'Manage Payments',
    },
    {
        title: 'Preferences',
        icon: BellIcon,
        lines: ['Email notifications: On', 'Language: English', 'Currency: EUR (€)'],
        action: 'Edit Settings',
    },
];

export function AccountSettings() {
    return (
        <section>
            <SectionHeading title="Account Settings" />
            <div className="grid gap-4 lg:grid-cols-3">
                {settings.map(({ action, icon: Icon, lines, title }) => (
                    <article className="rounded-lg border border-stone-200 bg-white p-5" key={title}>
                        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                            <Icon aria-hidden="true" className="text-[#b38145]" size={14} strokeWidth={1.8} />
                            {title}
                        </div>
                        <div className="mt-5 space-y-1 text-[10px] leading-4 text-stone-500">
                            {lines.map((line) => <p key={line}>{line}</p>)}
                        </div>
                        <button className="mt-5 text-[10px] font-medium text-[#b38145] transition hover:text-stone-950" type="button">{action}</button>
                    </article>
                ))}
            </div>
        </section>
    );
}
