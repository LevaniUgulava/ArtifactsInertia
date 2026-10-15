import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import admin from '@/routes/admin';

export function useAdminLogin() {
    const form = useForm({ email: '', password: '' }).withPrecognition('post', admin.login.submit.url());

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.submit();
    }

    return { form, handleSubmit };
}