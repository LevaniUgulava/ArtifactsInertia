<?php

namespace App\Http\Resources\Catalog;

use App\Models\Category;
use App\Models\Collection as ProductCollection;
use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CatalogResource
{
    /**
     * @param  array{
     *     sort: string,
     *     page: int,
     *     search: string,
     *     collection: string,
     *     activeFilters: array<string, mixed>,
     * }  $filters
     */
    public function __construct(
        private readonly LengthAwarePaginator $products,
        private readonly ?ProductCollection $collection,
        private readonly array $filters,
    ) {}

    public function resolve(Request $request): array
    {
        return [
            'collection' => $this->collectionData($request),
            'filters' => $this->filterCatalog($request),
            'activeFilters' => $this->filters['activeFilters'],
            'sort' => $this->filters['sort'],
            'search' => $this->filters['search'],
            'products' => CatalogProductResource::collection($this->products->getCollection())->resolve($request),
            'pagination' => [
                'currentPage' => $this->products->currentPage(),
                'lastPage' => $this->products->lastPage(),
                'perPage' => $this->products->perPage(),
                'total' => $this->products->total(),
            ],
        ];
    }

    private function collectionData(Request $request): array
    {
        if ($this->collection === null) {
            return [
                'name' => '',
                'count' => $this->products->total(),
                'image' => '',
            ];
        }

        return (new CollectionResource($this->collection))->resolve($request);
    }

    private function filterCatalog(Request $request): array
    {
        return [
            'categories' => CategoryResource::collection(Category::query()->orderBy('name')->get())->resolve($request),
            'sizes' => Variant::query()->distinct()->orderBy('size')->pluck('size')->all(),
            'colors' => ColorResource::collection(Variant::query()->select(['color', 'color_label', 'color_hex'])->distinct()->orderBy('color')->get())->resolve($request),
            'collections' => ProductCollection::query()->orderBy('name')->get()
                ->map(fn (ProductCollection $collection): array => [
                    'value' => $collection->slug,
                    'label' => $collection->name,
                ])->all(),
        ];
    }
}
