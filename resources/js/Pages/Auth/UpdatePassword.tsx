import { useTranslation } from 'react-i18next';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { login } from '@/routes';

export default function UpdatePassword() {
    const { t } = useTranslation(['auth', 'common']);

    return (
        <AuthLayout
            description={t('updatePassword.description')}
            footerAction={t('updatePassword.footerAction')}
            footerActionHref={login.url()}
            footerPrompt={t('updatePassword.footerPrompt')}
            title={t('updatePassword.title')}
        >
            <AuthInput autoComplete="new-password" label={t('password')} name="password" placeholder="••••••••" type="password" />
            <AuthInput autoComplete="new-password" label={t('passwordConfirmation')} name="password_confirmation" placeholder="••••••••" type="password" />

            <button className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c]" type="submit">
                {t('updatePassword.submit')}
            </button>
        </AuthLayout>
    );
}
