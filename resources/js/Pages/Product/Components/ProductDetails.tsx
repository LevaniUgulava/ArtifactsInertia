import type { ProductDetail } from './ProductTypes';

export function ProductDetails({ details }: { details: ProductDetail[] }) {
    return (
        <section className="grid gap-8 border-t border-stone-200 pt-8 md:grid-cols-3 md:gap-10">
            {details.map((detail) => (
                <article className="space-y-4" key={detail.title}>
                    <h2 className="text-sm font-semibold text-stone-950">{detail.title}</h2>
                    {detail.paragraphs?.map((paragraph) => <p className="text-xs leading-5 text-stone-600" key={paragraph}>{paragraph}</p>)}
                    {detail.bullets ? <ul className="space-y-2 text-xs leading-5 text-stone-600">{detail.bullets.map((bullet) => <li key={bullet}>· {bullet}</li>)}</ul> : null}
                </article>
            ))}
        </section>
    );
}
