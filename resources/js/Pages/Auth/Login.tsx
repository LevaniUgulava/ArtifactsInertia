import { useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { AuthInput } from '@/Components/Auth/AuthInput';
import { register } from '@/routes';
import login from '@/routes/login';
import password from '@/routes/password';
import type { FormEvent } from 'react';

export default function Login() {
    const form = useForm({
        email: '',
        password: '',
    }).withPrecognition('post', login.submit.url());

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.submit();
    }

    return (
        <AuthLayout
            description="Sign in to access exclusive drops, saved items, and faster checkout."
            footerAction="Create Account"
            footerActionHref={register.url()}
            footerPrompt="Don't have an account?"
            onSubmit={handleSubmit}
            showSocial
            title="Welcome Back"
        >
            <AuthInput
                autoComplete="email"
                error={form.errors.email}
                label="Email Address"
                name="email"
                onBlur={() => form.validate('email')}
                onChange={(e) => form.setData('email', e.target.value)}
                placeholder="you@example.com"
                type="email"
                valid={form.valid('email')}
                value={form.data.email}
            />
            <AuthInput
                autoComplete="current-password"
                error={form.errors.password}
                label="Password"
                name="password"
                onBlur={() => form.validate('password')}
                onChange={(e) => form.setData('password', e.target.value)}
                placeholder="••••••••"
                type="password"
                valid={form.valid('password')}
                value={form.data.password}
            />

            <div className="flex justify-end">
                <a className="text-sm text-amber-700 hover:underline" href={password.update.url()}>
                    Forgot password?
                </a>
            </div>

            <button
                className="min-h-16 w-full rounded-md bg-[#bb915b] px-5 text-base font-semibold text-white transition hover:bg-[#a77e4c] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={form.processing}
                type="submit"
            >
                {form.processing ? 'Signing In…' : 'Sign In'}
            </button>
        </AuthLayout>
    );
}
