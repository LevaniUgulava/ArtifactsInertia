import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { register } from '@/routes';
import password from '@/routes/password';

export default function Login() {
    return (
        <AuthLayout
            description="Sign in to access exclusive drops, saved items, and faster checkout."
            footerAction="Create Account"
            footerActionHref={register.url()}
            footerPrompt="Don't have an account?"
            showSocial
            title="Welcome Back"
        >
            <AuthInput autoComplete="email" label="Email Address" name="email" placeholder="you@example.com" type="email" />
            <AuthInput autoComplete="current-password" label="Password" name="password" placeholder="••••••••" type="password" />

            <div className="flex justify-end">
                <a className="text-sm text-amber-700 hover:underline" href={password.update.url()}>
                    Forgot password?
                </a>
            </div>

            <button className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c]" type="submit">
                Sign In
            </button>
        </AuthLayout>
    );
}
