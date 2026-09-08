import { useTranslation } from 'react-i18next';

type FeaturedCollectionProps = {
    featured: {
        eyebrow: string;
        title: string;
        description: string;
        image: string;
    };
};

export function FeaturedCollection({ featured }: FeaturedCollectionProps) {
    const { t } = useTranslation('catalog');

    return (
        <section className="relative isolate min-h-64 overflow-hidden rounded-sm">
            <img alt="Model wearing an Atelier Street collection look" className="absolute inset-0 size-full object-cover" src={featured.image} />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute left-6 top-6 max-w-xs bg-white/90 p-5 backdrop-blur-sm sm:left-8 sm:top-8 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700">{featured.eyebrow}</p>
                <h2 className="mt-2 text-xl font-semibold text-stone-950">{featured.title}</h2>
                <p className="mt-1 text-xs leading-5 text-stone-600">{featured.description}</p>
                <button className="mt-4 text-xs font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4" type="button">
                    {t('exploreNow')}
                </button>
            </div>
        </section>
    );
}
