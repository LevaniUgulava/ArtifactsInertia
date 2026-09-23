import type { InputHTMLAttributes } from 'react';

export type LanguageSwitcherProps = {
    className?: string;
};

export type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    label: string;
    valid?: boolean;
};

export type BrandLockupProps = {
    className?: string;
    tone?: 'dark' | 'light';
    showTagline?: boolean;
};