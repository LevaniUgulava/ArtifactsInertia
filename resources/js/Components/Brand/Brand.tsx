export const brand = {
    name: 'ARTIFACTS',
    tagline: 'WEAR A BETTER STORY',
    markSrc: '/branding/artifacts-mark.png',
    wordmarkSrc: '/branding/artifacts-wordmark.svg',
} as const;

export function brandTitle(title?: string): string {
    return title ? `${title} | ${brand.name}` : brand.name;
}

type BrandLockupProps = {
    className?: string;
    tone?: 'dark' | 'light';
    showTagline?: boolean;
};

export function BrandLockup({ className = '', tone = 'dark', showTagline = false }: BrandLockupProps) {
    const toneClass = tone === 'light' ? 'brightness-0 invert' : 'brightness-0';

    return (
        <span className={`inline-flex items-center gap-3 ${className}`}>
            <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-md bg-white p-1">
                <img alt="" aria-hidden="true" className="size-full object-contain" src={brand.markSrc} />
            </span>
            <span className="flex flex-col gap-1">
                <img alt={brand.name} className={`${toneClass} h-auto w-32 object-contain sm:w-36`} src={brand.wordmarkSrc} />
                {showTagline ? <span className="text-[8px] uppercase tracking-[0.42em] opacity-70">{brand.tagline}</span> : null}
            </span>
        </span>
    );
}
