import type { SectionTitleProps } from '../types/HomeTypes';

export function SectionTitle({ eyebrow, title }: SectionTitleProps) {
    return (
        <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl 2xl:text-4xl">{title}</h2>
            <p className="text-sm text-stone-500">{eyebrow}</p>
        </div>
    );
}