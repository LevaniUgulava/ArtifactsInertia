import type { ColorOption, FilterOption, FilterState } from './CatalogTypes';

type CatalogFiltersProps = {
    filters: {
        categories: FilterOption[];
        sizes: string[];
        colors: ColorOption[];
        collections: string[];
    };
    value: FilterState;
    onChange: (value: FilterState) => void;
    onApply: () => void;
    onClear: () => void;
};

function FilterPanel({ filters, value, onChange, onApply, onClear }: CatalogFiltersProps) {
    const toggleValue = (key: 'categories' | 'sizes' | 'colors' | 'collections', option: string) => {
        const values = value[key].includes(option) ? value[key].filter((item) => item !== option) : [...value[key], option];

        onChange({ ...value, [key]: values });
    };

    return (
        <div className="space-y-7 text-xs text-stone-700">
            <fieldset className="space-y-3">
                <legend className="font-semibold text-stone-950">Category</legend>
                <div className="space-y-2.5">
                    {filters.categories.map((category) => (
                        <label className="flex items-center gap-2.5" key={category.value}>
                            <input
                                checked={value.categories.includes(category.value)}
                                className="size-3.5 rounded-sm border-stone-300 text-amber-700 focus:ring-amber-700"
                                onChange={() => toggleValue('categories', category.value)}
                                type="checkbox"
                            />
                            {category.label}
                        </label>
                    ))}
                </div>
            </fieldset>

            <fieldset className="space-y-3 border-t border-stone-200 pt-6">
                <legend className="font-semibold text-stone-950">Size</legend>
                <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
                    {filters.sizes.map((size) => (
                        <button
                            className={`border py-2 transition ${value.sizes.includes(size) ? 'border-amber-700 bg-amber-700 text-white' : 'border-stone-200 hover:border-stone-500'}`}
                            key={size}
                            onClick={() => toggleValue('sizes', size)}
                            type="button"
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </fieldset>

            <fieldset className="space-y-3 border-t border-stone-200 pt-6">
                <legend className="font-semibold text-stone-950">Color</legend>
                <div className="flex flex-wrap gap-3">
                    {filters.colors.map((color) => (
                        <button
                            aria-label={color.label}
                            aria-pressed={value.colors.includes(color.value)}
                            className={`size-5 rounded-full border-2 p-0.5 transition ${value.colors.includes(color.value) ? 'border-amber-700 ring-1 ring-amber-700 ring-offset-2' : 'border-transparent'}`}
                            key={color.value}
                            onClick={() => toggleValue('colors', color.value)}
                            type="button"
                        >
                            <span className="block size-full rounded-full border border-black/10" style={{ backgroundColor: color.hex }} />
                        </button>
                    ))}
                </div>
            </fieldset>

            <fieldset className="space-y-3 border-t border-stone-200 pt-6">
                <legend className="font-semibold text-stone-950">Price Range</legend>
                <div className="flex items-center justify-between text-[10px] text-stone-500">
                    <span>$50</span>
                    <span>$2,500</span>
                </div>
                <div className="relative h-1 rounded-full bg-stone-200">
                    <span className="absolute inset-x-0 h-1 rounded-full bg-stone-400" />
                    <span className="absolute left-0 size-3 -translate-y-1 rounded-full border-2 border-white bg-stone-700 shadow" />
                    <span className="absolute right-0 size-3 -translate-y-1 rounded-full border-2 border-white bg-stone-700 shadow" />
                </div>
                <p className="font-semibold text-stone-950">${value.minPrice.toLocaleString()} – ${value.maxPrice.toLocaleString()}</p>
            </fieldset>

            <fieldset className="space-y-3 border-t border-stone-200 pt-6">
                <legend className="font-semibold text-stone-950">Collection</legend>
                <div className="space-y-2.5">
                    {filters.collections.map((collection) => {
                        const valueKey = collection.toLowerCase().replace("'", '').replace(' ', '-');

                        return (
                            <label className="flex items-center gap-2.5" key={collection}>
                                <input
                                    checked={value.collections.includes(valueKey)}
                                    className="size-3.5 rounded-sm border-stone-300 text-amber-700 focus:ring-amber-700"
                                    onChange={() => toggleValue('collections', valueKey)}
                                    type="checkbox"
                                />
                                {collection}
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <div className="space-y-3 border-t border-stone-200 pt-6">
                <button className="w-full bg-[#b58a52] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#9d7442]" onClick={onApply} type="button">
                    Apply Filters
                </button>
                <button className="w-full text-xs text-stone-500 transition hover:text-stone-950" onClick={onClear} type="button">
                    Clear All
                </button>
            </div>
        </div>
    );
}

export function CatalogFilters(props: CatalogFiltersProps) {
    return (
        <>
            <aside className="hidden lg:block">
                <FilterPanel {...props} />
            </aside>
            <details className="border-y border-stone-200 py-4 lg:hidden">
                <summary className="cursor-pointer text-xs font-semibold text-stone-950">Filters</summary>
                <div className="pt-6">
                    <FilterPanel {...props} />
                </div>
            </details>
        </>
    );
}
