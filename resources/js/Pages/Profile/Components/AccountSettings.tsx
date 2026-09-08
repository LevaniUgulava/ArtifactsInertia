import { BellIcon, CreditCardIcon, MapPinIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '@/Pages/Profile/Components/SectionHeading';

const settings = [
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

export function AccountSettings() {
    const { t } = useTranslation('profile');

    return (
        <section>
            <SectionHeading title={t('settings')} />
            <div className="grid gap-4 lg:grid-cols-3">
                {settings.map(({ action, icon: Icon, lines, title }) => (
                    <article className="rounded-lg border border-stone-200 bg-white p-5" key={title}>
                        <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                            <Icon aria-hidden="true" className="text-[#b38145]" size={14} strokeWidth={1.8} />
                            {t(title)}
                        </div>
                        <div className="mt-5 space-y-1 text-[10px] leading-4 text-stone-500">
                            {lines.map((line) => <p key={line}>{t(line)}</p>)}
                        </div>
                        <button className="mt-5 text-[10px] font-medium text-[#b38145] transition hover:text-stone-950" type="button">{t(action)}</button>
                    </article>
                ))}
            </div>
        </section>
    );
}
