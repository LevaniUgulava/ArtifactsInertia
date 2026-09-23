import type { FormEvent, ReactNode } from 'react';

export type RootLayoutProps = {
    children: ReactNode;
};

export type AuthLayoutProps = {
    children: ReactNode;
    description: string;
    showSocial?: boolean;
    title: string;
    footerPrompt?: string;
    footerAction?: string;
    footerActionHref?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

export type ProfileLayoutProps = {
    children: ReactNode;
};

export type CheckoutLayoutProps = {
    children: ReactNode;
};