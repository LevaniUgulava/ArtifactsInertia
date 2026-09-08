import { ArrowDownUpIcon } from 'lucide-react';

type CollectionHeaderProps = {
    name: string;
    count: number;
    sort: string;
    onSortChange: (sort: string) => void;
};

export function CollectionHeader({ name, count, sort, onSortChange }: CollectionHeaderProps) {
    return (
        <div className="flex flex-col gap-5 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">{name}</h1>
                <p className="mt-1 text-xs text-stone-500">Showing {count} products</p>
            </div>
            <label className="flex items-center gap-2 text-xs text-stone-500">
                <span>Sort by:</span>
                <span className="relative">
                    <select
                        aria-label="Sort products"
                        className="appearance-none border border-stone-200 bg-white py-2 pl-3 pr-9 text-xs text-stone-700 outline-none focus:border-amber-700"
                        onChange={(event) => onSortChange(event.target.value)}
                        value={sort}
                    >
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                    <ArrowDownUpIcon aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" size={13} />
                </span>
            </label>
        </div>
    );
}
