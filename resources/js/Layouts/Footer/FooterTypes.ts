import type { ReactNode } from 'react';

export type FooterLink = {
    href: string;
    label: string;
};

export type SocialIconProps = {
    ariaLabel: string;
    icon: ReactNode;
};
