import { usePage } from '@inertiajs/react';

export function useLocale(): string {
    const { props } = usePage();

    return (props.locale as string | undefined) ?? 'en';
}

export function useAvailableLocales(): string[] {
    const { props } = usePage();

    return (props.availableLocales as string[] | undefined) ?? ['en'];
}