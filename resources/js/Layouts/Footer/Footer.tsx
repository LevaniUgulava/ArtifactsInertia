const benefits = [
    {
        description: 'Every piece is curated with materials designed to last beyond a single season.',
        title: 'Artisan Craftsmanship',
    },
    {
        description: 'A wardrobe foundation shaped by timeless fabrics and understated details.',
        title: 'Elevated Essentials',
    },
    {
        description: 'Small batches, considered finishes, and pieces made to be worn on repeat.',
        title: 'Limited Drops',
    },
];

export function Footer() {
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
