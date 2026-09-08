type ShippingFields = {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    phone: string;
};

type ShippingInformationProps = {
    data: ShippingFields;
    errors: Record<string, string | undefined>;
    onChange: (field: keyof ShippingFields, value: string) => void;
};

function Field({ error, label, name, onChange, value }: { error?: string; label: string; name: keyof ShippingFields; onChange: ShippingInformationProps['onChange']; value: string }) {
    return (
        <label className="flex min-w-0 flex-1 flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor={name}>
            {label}
            <input
                aria-describedby={error ? `${name}-error` : undefined}
                aria-invalid={Boolean(error)}
                className="min-h-11 rounded-md border border-stone-200 bg-white px-3 text-xs font-normal text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-[#bb915b] focus:ring-2 focus:ring-[#bb915b]/20 aria-[invalid=true]:border-red-300"
                id={name}
                name={name}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
            />
            {error && <span className="font-normal text-red-500" id={`${name}-error`}>{error}</span>}
        </label>
    );
}

export function ShippingInformation({ data, errors, onChange }: ShippingInformationProps) {
    return (
        <section className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-bold text-stone-950 sm:text-base">Shipping Information</h2>
                <button className="text-[10px] font-semibold text-[#b38145] transition hover:text-stone-950" type="button">Use saved address</button>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Field error={errors.first_name} label="First Name" name="first_name" onChange={onChange} value={data.first_name} />
                    <Field error={errors.last_name} label="Last Name" name="last_name" onChange={onChange} value={data.last_name} />
                </div>
                <Field error={errors.address} label="Street Address" name="address" onChange={onChange} value={data.address} />
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Field error={errors.city} label="City" name="city" onChange={onChange} value={data.city} />
                    <Field error={errors.postal_code} label="Postal Code" name="postal_code" onChange={onChange} value={data.postal_code} />
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <label className="flex min-w-0 flex-1 flex-col gap-2 text-[10px] font-medium text-stone-500" htmlFor="country">
                        Country
                        <select className="min-h-11 rounded-md border border-stone-200 bg-white px-3 text-xs font-normal text-stone-700 outline-none transition focus:border-[#bb915b] focus:ring-2 focus:ring-[#bb915b]/20" id="country" name="country" value={data.country} onChange={(event) => onChange('country', event.target.value)}>
                            <option value="FR">France</option>
                            <option value="US">United States</option>
                            <option value="GB">United Kingdom</option>
                        </select>
                        {errors.country && <span className="font-normal text-red-500">{errors.country}</span>}
                    </label>
                    <Field error={errors.phone} label="Phone Number" name="phone" onChange={onChange} value={data.phone} />
                </div>
            </div>
        </section>
    );
}

export type { ShippingFields };
