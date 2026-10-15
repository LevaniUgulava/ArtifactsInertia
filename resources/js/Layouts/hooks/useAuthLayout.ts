import type { FormEvent } from 'react';
import type { AuthLayoutProps } from '@/types/layouts';

export function useAuthLayout(onSubmit: AuthLayoutProps['onSubmit']) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit?.(event);
    }

    return { handleSubmit };
}