import { Link } from '@inertiajs/react';
import { catalog, home } from '@/routes';

export function ProductBreadcrumb({ category, name }: { category: string; name: string }) {
    return (
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] text-stone-500">
            <Link className="transition hover:text-stone-950" href={home.url({ lang: 'en' })}>Home</Link>
            <span aria-hidden="true">/</span>
            <Link className="transition hover:text-stone-950" href={catalog.url({ lang: 'en' })}>{category}</Link>
            <span aria-hidden="true">/</span>
            <span className="text-stone-950">{name}</span>
        </nav>
    );
}
