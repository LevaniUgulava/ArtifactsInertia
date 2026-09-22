<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatalogProductResource;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CollectionResource;
use App\Http\Resources\ColorResource;
use App\Models\Category;
use App\Models\Collection as ProductCollection;
use App\Models\Product;
use App\Models\Variant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    /**
     * Show the public product catalog.
     */
    public function index(Request $request): Response
    {
        $sort = $request->string('sort')->toString();
        $sort = in_array($sort, ['newest', 'price-low', 'price-high'], true) ? $sort : 'newest';
        $page = max(1, $request->integer('page', 1));
        $search = $request->string('q')->trim()->toString();
        $collectionParam = $request->input('collection');
        $collectionSlug = is_string($collectionParam) ? $collectionParam : '';
        $collection = ProductCollection::query()
            ->withCount('products')
            ->when($collectionSlug !== '', fn ($query) => $query->where('slug', $collectionSlug))
            ->firstOrFail();
        $products = Product::query()
            ->with(['variants.media', 'categories', 'collections'])
            ->when(
                $collectionSlug !== '',
                fn ($query) => $query->whereHas('collections', fn ($collectionQuery) => $collectionQuery->whereKey($collection->getKey()))
            )
            ->when($search !== '', fn ($query) => $query->where(function ($searchQuery) use ($search): void {
                $searchQuery->where('name', 'like', "%{$search}%")
                    ->orWhere('eyebrow', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('spu', 'like', "%{$search}%")
                    ->orWhereHas('categories', fn ($categoryQuery) => $categoryQuery->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('collections', fn ($collectionQuery) => $collectionQuery->where('name', 'like', "%{$search}%"));
            }))
            ->withMin('variants', 'price')
            ->when($sort === 'price-low', fn ($query) => $query->orderBy('variants_min_price'))
            ->when($sort === 'price-high', fn ($query) => $query->orderByDesc('variants_min_price'))
            ->when($sort === 'newest', fn ($query) => $query->latest())
            ->paginate(6, ['*'], 'page', $page);

        $collectionData = $collectionSlug !== ''
            ? (new CollectionResource($collection))->resolve($request)
            : [
                'name' => '',
                'count' => $products->total(),
                'image' => '',
            ];

        return Inertia::render('Catalog/Catalog', [
            'catalog' => [
                'collection' => $collectionData,
                'filters' => [
                    'categories' => CategoryResource::collection(Category::query()->orderBy('name')->get())->resolve($request),
                    'sizes' => Variant::query()->distinct()->orderBy('size')->pluck('size')->all(),
                    'colors' => ColorResource::collection(Variant::query()->select(['color', 'color_label', 'color_hex'])->distinct()->orderBy('color')->get())->resolve($request),
                    'collections' => ProductCollection::query()->orderBy('name')->pluck('name')->all(),
                ],
                'activeFilters' => [
                    'categories' => $this->queryArray($request, 'category'),
                    'sizes' => $this->queryArray($request, 'size'),
                    'colors' => $this->queryArray($request, 'color'),
                    'collections' => $this->queryArray($request, 'collection'),
                    'minPrice' => $request->integer('minPrice', 50),
                    'maxPrice' => $request->integer('maxPrice', 2500),
                ],
                'sort' => $sort,
                'search' => $search,
                'products' => CatalogProductResource::collection($products->getCollection())->resolve($request),
                'pagination' => [
                    'currentPage' => $products->currentPage(),
                    'lastPage' => $products->lastPage(),
                    'perPage' => $products->perPage(),
                    'total' => $products->total(),
                ],
            ],
        ]);
    }

    /** @return list<string> */
    private function queryArray(Request $request, string $key): array
    {
        $values = $request->input($key, []);

        return is_array($values) ? array_values(array_filter($values, 'is_string')) : [];
    }
}
