import { useTranslation } from 'react-i18next';
import { AuthInput } from '@/Components/Auth/AuthInput';
import AdminAuthLayout from '@/Layouts/Admin/AdminAuthLayout';
import { useAdminLogin } from '@/Pages/Admin/Auth/hooks/useAdminLogin';

export default function Login() {
    const { t } = useTranslation(['admin', 'common']);
    const { form, handleSubmit } = useAdminLogin();

    return (
        <AdminAuthLayout description={t('loginDescription')} onSubmit={handleSubmit} title={t('loginTitle')}>
            <AuthInput
                autoComplete="email"
                error={form.errors.email}
                label={t('common:email')}
                name="email"
                onBlur={() => form.validate('email')}
                onChange={(event) => form.setData('email', event.target.value)}
                placeholder="admin@example.com"
                type="email"
                valid={form.valid('email')}
                value={form.data.email}
            />
            <AuthInput
                autoComplete="current-password"
                error={form.errors.password}
                label={t('common:password')}
                name="password"
                onBlur={() => form.validate('password')}
                onChange={(event) => form.setData('password', event.target.value)}
                placeholder="••••••••"
                type="password"
                valid={form.valid('password')}
                value={form.data.password}
            />
            <button className="min-h-12 w-full rounded-xl bg-cyan-700 px-4 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-60" disabled={form.processing} type="submit">
                {form.processing ? t('loginProcessing') : t('loginSubmit')}
            </button>
        </AdminAuthLayout>
    );
}