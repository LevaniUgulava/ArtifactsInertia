import type { ReactNode } from 'react';

export type Order = {
    id: string;
    date: string;
    itemCount: string;
    status: string;
    statusTone: 'success' | 'info';
    total: string;
    image: string;
};

export type OrderHistoryProps = {
    orders: Order[];
};

export type ProfileSummary = {
    stats: { label: string; value: number }[];
};

export type ProfileOverviewProps = {
    avatarUrl: string;
    email: string;
    memberSince: string | null;
    name: string;
    stats: ProfileSummary['stats'];
};

export type SavedItem = {
    name: string;
    price: string;
    image: string;
};

export type SavedItemsProps = {
    items: SavedItem[];
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
        savedItems: SavedItem[];
    };
};

export type ProfileSidebarPageProps = {
    locale?: string;
};