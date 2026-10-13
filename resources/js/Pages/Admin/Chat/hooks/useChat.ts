import { useMemo } from 'react';

export function useInitials(name: string): string {
    return useMemo(() => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase(), [name]);
}

export function useFormatDate(): (value: string | null) => string {
    const formatter = useMemo(() => new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }), []);

    return useMemo(() => (value: string | null) => {
        if (!value) {
            return '—';
        }

        return formatter.format(new Date(value));
    }, [formatter]);
}