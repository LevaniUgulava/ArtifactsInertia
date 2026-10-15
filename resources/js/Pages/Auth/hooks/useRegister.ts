import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import register from '@/routes/register';

export function useRegister() {
    const form = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    }).withPrecognition('post', register.submit.url());

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.submit();
    }

    return { form, handleSubmit };
}