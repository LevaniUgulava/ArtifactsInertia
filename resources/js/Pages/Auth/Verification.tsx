import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthLayout from '@/Layouts/AuthLayout';
import { login } from '@/routes';
import verification from '@/routes/verification';

type VerificationPageProps = {
    auth: {
        user: { name: string; email_verified_at: string | null } | null;
    };
    status?: string;
};

export default function Verification() {
    const { t } = useTranslation('auth');
    const { auth, status } = usePage<VerificationPageProps>().props;
    const [processing, setProcessing] = useState(false);
    const [resent, setResent] = useState(false);

    function resend() {
        setProcessing(true);
        router.post(verification.send.url(), {}, {
            preserveScroll: true,
            onSuccess: () => setResent(true),
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <AuthLayout
            description={t('verification.description')}
            footerAction={t('verification.footerAction')}
            footerActionHref={login.url()}
            footerPrompt={t('verification.footerPrompt')}
            title={t('verification.title')}
        >
            {(status === 'verification-link-sent' || status === 'verification-required' || resent) && (
                <p className="rounded-md border border-green-600/30 bg-green-50 px-4 py-3 text-sm leading-6 text-green-800">
                    {t('verification.sentMessage')}
                </p>
            )}

            {auth.user && (
                <button
                    className="min-h-14 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={processing}
                    type="button"
                    onClick={resend}
                >
                    {processing ? t('verification.resending') : resent ? t('verification.resent') : t('verification.resend')}
                </button>
            )}
        </AuthLayout>
    );
}
