import { useTranslation } from 'react-i18next';

type EditorialBannerProps = {
    editorial: {
        image: string;
    };
};

export function EditorialBanner({ editorial }: EditorialBannerProps) {
    const { t } = useTranslation('catalog');

    return (
        <section className="flex flex-col gap-6 bg-[#f5f0e8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="max-w-xl">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700">{t('editorialEyebrow')}</p>
                <h2 className="mt-2 text-xl font-semibold text-stone-950">{t('editorialTitle')}</h2>
                <p className="mt-1 max-w-md text-xs leading-5 text-stone-600">{t('editorialDescription')}</p>
                <button className="mt-4 border border-amber-700 px-4 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-700 hover:text-white" type="button">{t('readTheStory')}</button>
            </div>
            <img alt="Layered knitwear and accessories styled for transitional dressing" className="h-28 w-full object-cover sm:w-48" loading="lazy" src={editorial.image} />
        </section>
    );
}
