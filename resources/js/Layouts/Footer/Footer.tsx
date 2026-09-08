import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation('footer');

    const benefits = [
        {
            description: t('artisanCraftsmanship.description'),
            title: t('artisanCraftsmanship.title'),
        },
        {
            description: t('elevatedEssentials.description'),
            title: t('elevatedEssentials.title'),
        },
        {
            description: t('limitedDrops.description'),
            title: t('limitedDrops.title'),
        },
    ];
    return (
        <footer className="bg-stone-950 text-stone-100">
            <div className="mx-auto grid max-w-[1920px] gap-10 px-5 py-14 sm:px-8 sm:py-16 lg:px-12 2xl:px-16 2xl:py-24 md:grid-cols-3">
                {benefits.map((benefit) => (
                    <section className="space-y-3" key={benefit.title}>
                        <span className="text-amber-500" aria-hidden="true">
                            ✦
                        </span>
                        <h2 className="text-base font-semibold">{benefit.title}</h2>
                        <p className="max-w-xs text-sm leading-6 text-stone-400">{benefit.description}</p>
                    </section>
                ))}
            </div>
        </footer>
    );
}
