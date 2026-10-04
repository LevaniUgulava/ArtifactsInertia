<?php

namespace App\Services;

use App\Models\Collection as ProductCollection;
use App\Models\Product;
use Illuminate\Support\Collection;

class HomeService
{
    public function getNewArrivals(): Collection
    {
        return Product::with(['variants.media', 'categories', 'collections'])
            ->withMin('variants', 'price')
            ->latest()
            ->limit(4)
            ->get();
    }

    public function getTrendingProducts(): Collection
    {
        return Product::with(['variants.media', 'categories', 'collections'])
            ->withMin('variants', 'price')
            ->whereNotNull('badge')
            ->latest()
            ->limit(4)
            ->get();
    }

    public function getCollections(): array
    {
        return ProductCollection::whereIn('slug', ['womens', 'mens'])
            ->get()
            ->map(fn (ProductCollection $collection): array => [
                'name' => $collection->name,
                'slug' => $collection->slug,
                'image' => $collection->image,
            ])
            ->values()
            ->all();
    }
}
