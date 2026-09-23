export const brand = {
    name: 'ARTIFACTS',
    tagline: 'WEAR A BETTER STORY',
    markSrc: '/branding/artifacts-mark.png',
    wordmarkSrc: '/branding/artifacts-wordmark.svg',
} as const;

export function brandTitle(title?: string): string {
    return title ? `${title} | ${brand.name}` : brand.name;
}