import { useTranslation } from 'react-i18next';

export function useCollectionBanners() {
    const { t } = useTranslation('home');

    function titleFor(name: string): string {
        return name === "Women's" ? t('women.title') : t('men.title');
    }

    function descriptionFor(slug: string): string {
        return slug === 'mens' ? t('men.description') : t('women.description');
    }

    return { titleFor, descriptionFor };
}