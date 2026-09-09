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
        $collection = ProductCollection::query()
            ->withCount('products')
            ->where('slug', 'fall-winter-collection')
            ->firstOrFail();
        $products = Product::query()
            ->with(['variants.media', 'categories', 'collections'])
            ->whereHas('collections', fn ($query) => $query->whereKey($collection->getKey()))
            ->withMin('variants', 'price')
            ->when($sort === 'price-low', fn ($query) => $query->orderBy('variants_min_price'))
            ->when($sort === 'price-high', fn ($query) => $query->orderByDesc('variants_min_price'))
            ->when($sort === 'newest', fn ($query) => $query->latest())
            ->paginate(6, ['*'], 'page', $page);

        return Inertia::render('Catalog/Catalog', [
            'catalog' => [
                'collection' => (new CollectionResource($collection))->resolve($request),
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
