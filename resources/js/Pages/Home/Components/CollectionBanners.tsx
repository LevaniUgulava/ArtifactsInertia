export function CollectionBanners() {
    return (
        <section className="mx-auto grid max-w-[1920px] gap-4 px-5 pb-14 sm:gap-5 sm:px-8 sm:pb-20 lg:px-12 2xl:gap-8 2xl:px-16 2xl:pb-28 md:grid-cols-2">
            <a className="group relative isolate min-h-[24rem] overflow-hidden sm:min-h-[27rem] lg:min-h-[31rem] 2xl:min-h-[42rem]" href="#women" id="women">
                <img
                    alt="Woman in a dark fashion look"
                    className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-x-0 bottom-0 space-y-4 p-6 text-white sm:p-8 2xl:p-12">
                    <div>
                        <h2 className="text-3xl font-semibold">Women</h2>
                        <p className="mt-1 text-sm text-stone-200">Architectural silhouettes, refined edge.</p>
                    </div>
                    <span className="inline-flex bg-white px-4 py-3 text-xs font-bold text-stone-950">EXPLORE COLLECTION</span>
                </div>
            </a>
            <a className="group relative isolate min-h-[24rem] overflow-hidden sm:min-h-[27rem] lg:min-h-[31rem] 2xl:min-h-[42rem]" href="#men" id="men">
                <img
                    alt="Man in an elevated casual outfit"
                    className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105"
                    src="https://images.unsplash.com/photo-1506629905607-d405b7a30db5?auto=format&fit=crop&w=1200&q=85"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute inset-x-0 bottom-0 space-y-4 p-6 text-white sm:p-8 2xl:p-12">
                    <div>
                        <h2 className="text-3xl font-semibold">Men</h2>
                        <p className="mt-1 text-sm text-stone-200">Urban luxury, modern form.</p>
                    </div>
                    <span className="inline-flex bg-white px-4 py-3 text-xs font-bold text-stone-950">EXPLORE COLLECTION</span>
                </div>
            </a>
        </section>
    );
}