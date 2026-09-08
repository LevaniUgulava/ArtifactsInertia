import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
            description="We've sent a verification link to your email address. Check your inbox and click the link to finish setting up your account."
            footerAction="Back to Sign In"
            footerActionHref={login.url()}
            footerPrompt="Already have an account?"
            title="Check Your Email"
        >
            {(status === 'verification-link-sent' || status === 'verification-required' || resent) && (
                <p className="rounded-md border border-green-600/30 bg-green-50 px-4 py-3 text-sm leading-6 text-green-800">
                    A verification link has been sent to your email address. Please check your inbox (and spam folder) and click the link to verify your account.
                </p>
            )}

            {auth.user && (
                <button
                    className="min-h-14 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c] disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={processing}
                    type="button"
                    onClick={resend}
                >
                    {processing ? 'Resending…' : resent ? 'Verification link sent' : 'Resend Verification Email'}
                </button>
            )}
        </AuthLayout>
    );
}
