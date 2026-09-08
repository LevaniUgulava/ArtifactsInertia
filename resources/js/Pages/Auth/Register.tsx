import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { login } from '@/routes';
import register from '@/routes/register';
import type { FormEvent } from 'react';

export default function Register() {
    const { t } = useTranslation(['auth', 'common']);
    const form = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    }).withPrecognition('post', register.submit.url());

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.submit();
    }

    return (
        <AuthLayout
            description={t('register.description')}
            footerAction={t('register.footerAction')}
            footerActionHref={login.url()}
            footerPrompt={t('register.footerPrompt')}
            onSubmit={handleSubmit}
            showSocial
            title={t('register.title')}
        >
            <AuthInput
                autoComplete="username"
                error={form.errors.username}
                label={t('register.username')}
                name="username"
                onBlur={() => form.validate('username')}
                onChange={(e) => form.setData('username', e.target.value)}
                placeholder={t('register.usernamePlaceholder')}
                type="text"
                valid={form.valid('username')}
                value={form.data.username}
            />
            <AuthInput
                autoComplete="email"
                error={form.errors.email}
                label={t('email')}
                name="email"
                onBlur={() => form.validate('email')}
                onChange={(e) => form.setData('email', e.target.value)}
                placeholder="you@example.com"
                type="email"
                valid={form.valid('email')}
                value={form.data.email}
            />
            <AuthInput
                autoComplete="new-password"
                error={form.errors.password}
                label={t('password')}
                name="password"
                onBlur={() => form.validate('password')}
                onChange={(e) => form.setData('password', e.target.value)}
                placeholder="••••••••"
                type="password"
                valid={form.valid('password')}
                value={form.data.password}
            />
            <AuthInput
                autoComplete="new-password"
                error={form.errors.password_confirmation}
                label={t('passwordConfirmation')}
                name="password_confirmation"
                onBlur={() => form.validate('password_confirmation')}
                onChange={(e) => form.setData('password_confirmation', e.target.value)}
                placeholder="••••••••"
                type="password"
                valid={form.valid('password_confirmation')}
                value={form.data.password_confirmation}
            />

            <button
                className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={form.processing}
                type="submit"
            >
                {form.processing ? t('register.processing') : t('register.submit')}
            </button>
        </AuthLayout>
    );
}
