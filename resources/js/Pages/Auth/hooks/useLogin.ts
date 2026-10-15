import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import login from '@/routes/login';

export function useLogin() {
    const form = useForm({
        email: '',
        password: '',
    }).withPrecognition('post', login.submit.url());

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        form.submit();
    }

    return { form, handleSubmit };
}