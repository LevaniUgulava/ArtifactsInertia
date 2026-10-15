import type { FormEvent, ReactNode } from 'react';

export type AdminAuthLayoutProps = {
    children: ReactNode;
    description: string;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    title: string;
};
