import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { login } from '@/routes';

export default function Register() {
    return (
        <AuthLayout
            description="Create an account for exclusive drops, saved items, and faster checkout."
            footerAction="Sign In"
            footerActionHref={login.url()}
            footerPrompt="Already have an account?"
            showSocial
            title="Create Account"
        >
            <AuthInput autoComplete="username" label="Username" name="username" placeholder="your username" type="text" />
            <AuthInput autoComplete="email" label="Email Address" name="email" placeholder="you@example.com" type="email" />
            <AuthInput autoComplete="new-password" label="Password" name="password" placeholder="••••••••" type="password" />
            <AuthInput autoComplete="new-password" label="Confirm Password" name="password_confirmation" placeholder="••••••••" type="password" />

            <button className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c]" type="submit">
                Create Account
            </button>
        </AuthLayout>
    );
}
