<?php

namespace App\Models;

use Database\Factories\ProductFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['spu', 'slug', 'name', 'eyebrow', 'description', 'badge', 'sex', 'benefits', 'details'])]
class Product extends Model
{
    /** @use HasFactory<ProductFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'details' => 'array',
            'sex' => 'string',
        ];
    }

    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    public function collections(): BelongsToMany
    {
        return $this->belongsToMany(Collection::class);
    }

    /**
     * Scope the query to products matching the active catalog state.
     *
     * @param  array{
     *     categories: list<string>,
     *     sizes: list<string>,
     *     colors: list<string>,
     *     collections: list<string>,
     *     minPrice: int,
     *     maxPrice: int,
     * }  $filters
     */
    public function scopeForCatalog(Builder $query, ?Collection $collection, string $search, string $sort, array $filters): void
    {
        $categoryNames = Category::query()->get()
            ->filter(fn (Category $category): bool => in_array(str($category->name)->slug()->toString(), $filters['categories'], true))
            ->pluck('name');

        $collectionSlugs = collect($filters['collections'])
            ->when($collection !== null, fn ($slugs) => $slugs->push($collection->slug))
            ->values()
            ->all();

        $query
            ->with(['variants.media', 'categories', 'collections'])
            ->withMin('variants', 'price')
            ->when($collectionSlugs !== [], fn (Builder $query) => $query->whereHas('collections', fn (Builder $query) => $query->whereIn('slug', $collectionSlugs)))
            ->when($filters['categories'] !== [], fn (Builder $query) => $query->whereHas('categories', fn (Builder $query) => $query->whereIn('name', $categoryNames)))
            ->when($filters['sizes'] !== [], fn (Builder $query) => $query->whereHas('variants', fn (Builder $query) => $query->whereIn('size', $filters['sizes'])))
            ->when($filters['colors'] !== [], fn (Builder $query) => $query->whereHas('variants', fn (Builder $query) => $query->whereIn('color', $filters['colors'])))
            ->when(true, fn (Builder $query) => $query->whereHas('variants', fn (Builder $query) => $query->whereBetween('price', [$filters['minPrice'], $filters['maxPrice']])))
            ->when($search !== '', function (Builder $query) use ($search): void {
                $query->where(function (Builder $searchQuery) use ($search): void {
                    $searchQuery->where('name', 'like', "%{$search}%")
                        ->orWhere('eyebrow', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('spu', 'like', "%{$search}%")
                        ->orWhereHas('categories', fn (Builder $categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"))
                        ->orWhereHas('collections', fn (Builder $collectionQuery) => $collectionQuery->where('name', 'like', "%{$search}%"));
                });
            })
            ->when($sort === 'price-low', fn (Builder $query) => $query->orderBy('variants_min_price'))
            ->when($sort === 'price-high', fn (Builder $query) => $query->orderByDesc('variants_min_price'))
            ->when($sort === 'newest', fn (Builder $query) => $query->latest());
    }

    /**
     * @return list<array{src: string, alt: string}>
     */
    public function imageUrls(): array
    {
        return $this->variants
            ->flatMap(fn (Variant $variant): array => $variant->imageUrls())
            ->unique(fn (array $image): string => basename((string) parse_url($image['src'], PHP_URL_PATH)))
            ->values()
            ->all();
    }

    public function startingPrice(): ?string
    {
        $price = $this->variants->min('price');

        return $price === null ? null : number_format((float) $price, 2, '.', ',');
    }

    public function primaryImageUrl(): ?string
    {
        $variant = $this->variants->first();

        if ($variant === null) {
            return null;
        }

        return $variant->getFirstMediaUrl('images', 'preview') ?: null;
    }
}
