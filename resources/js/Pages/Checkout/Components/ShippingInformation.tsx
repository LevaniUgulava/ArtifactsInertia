import { useTranslation } from 'react-i18next';
import type { ShippingFields, ShippingInformationProps } from '../types/CheckoutTypes';

function Field({ error, inputMode, label, name, onChange, placeholder, type = 'text', value }: { error?: string; inputMode?: 'tel' | 'text'; label: string; name: keyof ShippingFields; onChange: ShippingInformationProps['onChange']; placeholder?: string; type?: string; value: string }) {
    return (
        <label className="flex min-w-0 flex-1 flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor={name}>
            {label}
            <input
                aria-describedby={error ? `${name}-error` : undefined}
                aria-invalid={Boolean(error)}
                className="min-h-11 rounded-md border border-stone-200 bg-white px-3 text-xs font-normal text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-[#bb915b] focus:ring-2 focus:ring-[#bb915b]/20 aria-[invalid=true]:border-red-300"
                id={name}
                inputMode={inputMode}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
            />
            {error && <span className="font-normal text-red-500" id={`${name}-error`}>{error}</span>}
        </label>
    );
}

export function ShippingInformation({ data, errors, onChange }: ShippingInformationProps) {
    const { t } = useTranslation('checkout');

    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-bold text-stone-950 sm:text-base">{t('shippingInformation')}</h2>
                <button className="text-[10px] font-semibold text-[#b38145] transition hover:text-stone-950" type="button">{t('useSavedAddress')}</button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Field error={errors.first_name} label={t('first_name')} name="first_name" onChange={onChange} value={data.first_name} />
                    <Field error={errors.last_name} label={t('last_name')} name="last_name" onChange={onChange} value={data.last_name} />
                </div>
                <Field error={errors.address} label={t('streetAddress')} name="address" onChange={onChange} value={data.address} />
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Field error={errors.city} label={t('city')} name="city" onChange={onChange} value={data.city} />
                    <label className="flex min-w-0 flex-1 flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor="phone">
                        {t('phoneNumber')}
                        <div className="flex min-h-11 overflow-hidden rounded-md border border-stone-200 bg-white transition focus-within:border-[#bb915b] focus-within:ring-2 focus-within:ring-[#bb915b]/20 aria-[invalid=true]:border-red-300">
                            <span className="flex items-center border-r border-stone-200 bg-stone-50 px-3 text-xs font-semibold text-stone-600">+995</span>
                            <input
                                aria-describedby={errors.phone ? 'phone-error' : undefined}
                                aria-invalid={Boolean(errors.phone)}
                                className="min-w-0 flex-1 bg-transparent px-3 text-xs font-normal text-stone-700 outline-none placeholder:text-stone-400"
                                id="phone"
                                inputMode="tel"
                                type="tel"
                                value={data.phone.replace(/^\+995/, '')}
                                onChange={(event) => onChange('phone', `+995${event.target.value}`)}
                            />
                        </div>
                        {errors.phone && <span className="font-normal text-red-500" id="phone-error">{errors.phone}</span>}
                    </label>
                </div>
                <p className="text-[10px] text-stone-400">{t('shipsOnlyGeorgia')}</p>
            </div>
        </section>
    );
}