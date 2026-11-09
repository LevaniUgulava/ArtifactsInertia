import { useTranslation } from 'react-i18next';
import { useImageError } from '@/Pages/Admin/Components/hooks/useImageError';
import type { TryonResultImageProps } from '@/Pages/Admin/Tryon/TryonTypes';

export function TryonResultImage({ alt, src }: TryonResultImageProps) {
    const { t } = useTranslation('admin');
    const { hasError, onError } = useImageError();

    if (hasError) {
        return (
            <div className="grid size-full min-h-48 place-items-center px-5 text-center text-sm text-slate-500">
                {t('tryonExpiredImage')}
            </div>
        );
    }

    return <img alt={alt} className="mx-auto max-h-[75vh] size-full object-contain" onError={onError} src={src} />;
}
