import type { SharedPageProps } from '@/types/shared';

export type HeaderPageProps = SharedPageProps & {
    catalog?: { search?: string };
};

export type MobileHeaderProps = {
    user: {
        name: string;
        email: string;
    } | null;
    lang: string;
    onClose: () => void;
};

export type SearchModalProps = {
    initialQuery: string;
    lang: string;
    onClose: () => void;
};
