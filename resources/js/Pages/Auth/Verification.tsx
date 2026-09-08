import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { login } from '@/routes';

export default function Verification() {
    return (
        <AuthLayout
            description="Enter your email address to continue your Atelier Street journey."
            footerAction="Back to Sign In"
            footerActionHref={login.url()}
            footerPrompt="Already have an account?"
            title="Verify Your Email"
        >
            <AuthInput autoComplete="email" label="Email Address" name="email" placeholder="you@example.com" type="email" />

            <button className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c]" type="submit">
                Verify Email
            </button>
        </AuthLayout>
    );
}
