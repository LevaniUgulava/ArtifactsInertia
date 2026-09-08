import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { login } from '@/routes';

export default function UpdatePassword() {
    return (
        <AuthLayout
            description="Choose a new password to keep your Atelier Street account secure."
            footerAction="Back to Sign In"
            footerActionHref={login.url()}
            footerPrompt="Remembered your password?"
            title="Update Password"
        >
            <AuthInput autoComplete="new-password" label="Password" name="password" placeholder="••••••••" type="password" />
            <AuthInput autoComplete="new-password" label="Confirm Password" name="password_confirmation" placeholder="••••••••" type="password" />

            <button className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c]" type="submit">
                Update Password
            </button>
        </AuthLayout>
    );
}
