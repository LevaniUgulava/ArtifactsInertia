<?php

namespace App\Services;

use App\Models\Collection as ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CatalogService
{
    public function __construct(private readonly CatalogFilterService $filters) {}

    /**
     * @return array{
     *     filters: array<string, mixed>,
     *     collection: ProductCollection|null,
     *     products: LengthAwarePaginator,
     * }
     */
    public function browse(Request $request): array
    {
        $filters = $this->filters->from($request);

        $collection = $filters['collection'] !== ''
            ? ProductCollection::query()
                ->withCount('products')
                ->where('slug', $filters['collection'])
                ->firstOrFail()
            : null;

        $products = Product::query()
            ->forCatalog($collection, $filters['search'], $filters['sort'], $filters['activeFilters'])
            ->paginate(6, ['*'], 'page', $filters['page']);

        return compact('filters', 'collection', 'products');
    }
}
