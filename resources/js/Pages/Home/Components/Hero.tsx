export function Hero() {
    return (
        <section className="relative isolate min-h-124 overflow-hidden bg-stone-900 sm:min-h-160 lg:min-h-176 2xl:min-h-216">
            <img
                alt="Models wearing dark outerwear"
                className="absolute inset-0 size-full object-cover opacity-70"
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/25 to-transparent" />
            <div className="relative mx-auto flex min-h-124 max-w-[1920px] items-end px-5 py-12 sm:min-h-160 sm:px-8 sm:py-20 lg:px-12 2xl:min-h-216 2xl:px-16 2xl:py-28">
                <div className="max-w-md space-y-5 text-white sm:space-y-6 2xl:max-w-xl">
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-stone-300">AUTUMN / WINTER 2024</p>
                    <h1 className="text-4xl font-semibold leading-[0.92] tracking-tight sm:text-7xl 2xl:text-8xl">Elevated essentials</h1>
                    <p className="max-w-sm text-sm leading-6 text-stone-200 2xl:max-w-lg 2xl:text-base">Where streetwear meets craftsmanship. Discover pieces designed for those who refuse to compromise.</p>
                    <div className="flex flex-wrap gap-3">
                        <a className="bg-white px-5 py-3 text-xs font-bold tracking-wide text-stone-950 transition hover:bg-stone-200" href="#new-arrivals">
                            SHOP WOMEN
                        </a>
                        <a className="border border-white/70 px-5 py-3 text-xs font-bold tracking-wide text-white transition hover:bg-white hover:text-stone-950" href="#men">
                            SHOP MEN
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
