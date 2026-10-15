import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import type { VerificationPageProps } from '@/Pages/Auth/AuthTypes';
import verification from '@/routes/verification';

export function useVerification() {
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

    return { auth, status, processing, resent, resend };
}