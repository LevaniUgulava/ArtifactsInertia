import { UserRoundIcon } from 'lucide-react';
import { type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { statKeys } from '../constants/statKeys';
import { useProfileForm } from '../hooks/useProfileForm';
import type { ProfileFormProps } from '../types/ProfileTypes';

export function ProfileForm({ avatarUrl, email, memberSince, name, stats }: ProfileFormProps) {
    const { t } = useTranslation('profile');
    const { avatarPreview, form, selectAvatar, submit } = useProfileForm(name, email);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        submit();
    }

    const inputClassName = 'min-h-11 w-full rounded-lg border border-stone-200 bg-stone-50 px-3 text-xs text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-[#bb915b] focus:bg-white focus:ring-2 focus:ring-[#bb915b]/20';
    const errorClassName = 'mt-1.5 text-[10px] text-red-600';

    return (
        <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-7">
            <div className="flex flex-col gap-7 border-b border-stone-100 pb-7 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
                <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative size-16 shrink-0 sm:size-20">
                        <div className="grid size-full place-items-center overflow-hidden rounded-full bg-stone-200">
                            {avatarPreview || avatarUrl ? <img alt={t('profilePhoto')} className="size-full object-cover" src={avatarPreview ?? avatarUrl} /> : <UserRoundIcon aria-hidden="true" className="text-stone-500" size={28} />}
                        </div>
                        <label className="absolute -bottom-1 -right-1 grid size-7 cursor-pointer place-items-center rounded-full border-2 border-white bg-[#b58a52] text-[10px] font-bold text-white shadow-sm transition hover:bg-[#9d7442]" title={t('changePhoto')}>
                            <span className="sr-only">{t('changePhoto')}</span>
                            <input
                                accept="image/*"
                                className="sr-only"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];

                                    if (file) {
                                        selectAvatar(file);
                                    }
                                }}
                                type="file"
                            />
                            +
                        </label>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b38145]">{t('accountDetails')}</p>
                        <h1 className="text-xl font-bold tracking-tight text-stone-950 sm:text-2xl">{name}</h1>
                        <p className="text-xs text-stone-500">{t('memberSince', { year: memberSince ?? t('recently') })}</p>
                        <p className="text-[10px] text-stone-400">{t('avatarHint')}</p>
                    </div>
                </div>

                <dl className="grid grid-cols-3 gap-6 sm:gap-8">
                    {stats.map((stat) => (
                        <div className="text-center sm:min-w-14" key={stat.label}>
                            <dd className="text-lg font-semibold text-[#b38145] sm:text-xl">{stat.value}</dd>
                            <dt className="mt-1 text-[10px] text-stone-500">{t(statKeys[stat.label] ?? stat.label, { defaultValue: stat.label })}</dt>
                        </div>
                    ))}
                </dl>
            </div>

            <form className="mt-7 space-y-7" onSubmit={handleSubmit}>
                <div>
                    <h2 className="text-sm font-bold tracking-tight text-stone-950">{t('updateProfile')}</h2>
                    <p className="mt-1 text-xs text-stone-500">{t('updateProfileDescription')}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-[10px] font-semibold text-stone-700">
                        <span>{t('name')}</span>
                        <input
                            aria-invalid={Boolean(form.errors.name)}
                            autoComplete="name"
                            className={inputClassName}
                            name="name"
                            value={form.data.name}
                            onChange={(event) => form.setData('name', event.target.value)}
                        />
                        {form.errors.name ? <p className={errorClassName}>{form.errors.name}</p> : null}
                    </label>

                    <label className="space-y-2 text-[10px] font-semibold text-stone-700">
                        <span>{t('email')}</span>
                        <input
                            aria-invalid={Boolean(form.errors.email)}
                            autoComplete="email"
                            className={inputClassName}
                            name="email"
                            type="email"
                            value={form.data.email}
                            onChange={(event) => form.setData('email', event.target.value)}
                        />
                        {form.errors.email ? <p className={errorClassName}>{form.errors.email}</p> : null}
                    </label>
                </div>

                <div className="border-t border-stone-100 pt-7">
                    <h3 className="text-sm font-bold tracking-tight text-stone-950">{t('changePassword')}</h3>
                    <p className="mt-1 text-xs text-stone-500">{t('passwordOptional')}</p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-[10px] font-semibold text-stone-700">
                            <span>{t('newPassword')}</span>
                            <input
                                aria-invalid={Boolean(form.errors.password)}
                                autoComplete="new-password"
                                className={inputClassName}
                                name="password"
                                type="password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                            />
                            {form.errors.password ? <p className={errorClassName}>{form.errors.password}</p> : null}
                        </label>

                        <label className="space-y-2 text-[10px] font-semibold text-stone-700">
                            <span>{t('confirmPassword')}</span>
                            <input
                                aria-invalid={Boolean(form.errors.password_confirmation)}
                                autoComplete="new-password"
                                className={inputClassName}
                                name="password_confirmation"
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(event) => form.setData('password_confirmation', event.target.value)}
                            />
                            {form.errors.password_confirmation ? <p className={errorClassName}>{form.errors.password_confirmation}</p> : null}
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[10px] text-stone-500">{form.recentlySuccessful ? t('profileUpdated') : ''}</p>
                    <button className="rounded-lg bg-[#b58a52] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#9d7442] disabled:cursor-not-allowed disabled:bg-stone-300" disabled={form.processing} type="submit">
                        {form.processing ? t('updatingProfile') : t('saveChanges')}
                    </button>
                </div>
            </form>
        </section>
    );
}
