import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { catalog } from '@/routes';

type CollectionBanner = {
    name: string;
    slug: string;
    image: string;
};

export function CollectionBanners({ collections }: { collections: CollectionBanner[] }) {
    const { t } = useTranslation('home');
    const { props } = usePage();
    const lang = (props.locale as string) ?? 'en';

    const copy = (key: string) => (key === "Women's" ? t('women.title') : t('men.title'));

    return (
        <section className="mx-auto grid max-w-[1920px] gap-4 px-5 pb-14 sm:gap-5 sm:px-8 sm:pb-20 lg:px-12 2xl:gap-8 2xl:px-16 2xl:pb-28 md:grid-cols-2">
            {collections.map(({ name, slug, image }) => (
                <Link className="group relative isolate min-h-[24rem] overflow-hidden sm:min-h-[27rem] lg:min-h-[31rem] 2xl:min-h-[42rem]" href={catalog.url({ lang }, { query: { collection: slug } })} key={slug}>
                    <img
                        alt={copy(name)}
                        className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                        src={image}
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-x-0 bottom-0 space-y-4 p-6 text-white sm:p-8 2xl:p-12">
                        <div>
                            <h2 className="text-3xl font-semibold">{copy(name)}</h2>
                            <p className="mt-1 text-sm text-stone-200">{slug === 'mens' ? t('men.description') : t('women.description')}</p>
                        </div>
                        <span className="inline-flex bg-white px-4 py-3 text-xs font-bold text-stone-950">{t('exploreCollection')}</span>
                    </div>
                </Link>
            ))}
        </section>
    );
}