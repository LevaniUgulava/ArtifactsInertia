export type VerificationPageProps = {
    auth: {
        user: { name: string; email_verified_at: string | null } | null;
    };
    status?: string;
};