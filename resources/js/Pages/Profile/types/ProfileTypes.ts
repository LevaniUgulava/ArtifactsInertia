import type { ReactNode } from 'react';
import type { CatalogProduct } from '@/Pages/Catalog/types/CatalogTypes';

export type Order = {
    id: string;
    date: string;
    itemCount: string;
    status: string;
    statusTone: 'success' | 'info';
    total: string;
    image: string;
};

export type ProfileSummary = {
    stats: { label: string; value: number }[];
};

export type ProfileFormData = {
    avatar: File | null;
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type ProfileFormProps = {
    avatarUrl: string;
    email: string;
    memberSince: string | null;
    name: string;
    stats: ProfileSummary['stats'];
};

export type SectionHeadingProps = {
    action?: ReactNode;
    title: string;
};

export type ProfilePageProps = {
    profile: {
        name: string;
        email: string;
        memberSince: string | null;
        avatarUrl: string;
        stats: ProfileSummary['stats'];
        orders: Order[];
    };
};

export type ProfileSidebarPageProps = {
    locale?: string;
};

export type FavoritesPageProps = {
    favorites: CatalogProduct[];
};
