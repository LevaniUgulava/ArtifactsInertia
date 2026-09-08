import { useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { register } from '@/routes';
import login from '@/routes/login';
import password from '@/routes/password';
import type { FormEvent } from 'react';

export default function Login() {
    const { t } = useTranslation(['auth', 'common']);
    const form = useForm({
        email: '',
        password: '',
    }).withPrecognition('post', login.submit.url());

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.submit();
    }

    return (
        <AuthLayout
            description={t('login.description')}
            footerAction={t('login.footerAction')}
            footerActionHref={register.url()}
            footerPrompt={t('login.footerPrompt')}
            onSubmit={handleSubmit}
            showSocial
            title={t('login.title')}
        >
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
                autoComplete="current-password"
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

            <div className="flex justify-end">
                <a className="text-sm text-amber-700 hover:underline" href={password.update.url()}>
                    {t('forgotPassword')}
                </a>
            </div>

            <button
                className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={form.processing}
                type="submit"
            >
                {form.processing ? t('login.processing') : t('login.submit')}
            </button>
        </AuthLayout>
    );
}
