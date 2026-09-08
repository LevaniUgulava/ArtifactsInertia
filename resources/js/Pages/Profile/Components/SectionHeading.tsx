import type { ReactNode } from 'react';

type SectionHeadingProps = {
    action?: ReactNode;
    title: string;
};

export function SectionHeading({ action, title }: SectionHeadingProps) {
    return (
        <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-sm font-bold tracking-tight text-stone-950 sm:text-base">{title}</h2>
            {action}
        </div>
    );
}
