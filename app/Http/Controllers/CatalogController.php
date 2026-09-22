<?php

namespace App\Http\Controllers;

use App\Http\Resources\CatalogResource;
use App\Models\Collection as ProductCollection;
use App\Models\Product;
use App\Services\CatalogFilterService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function __construct(private readonly CatalogFilterService $filters) {}

    /**
     * Show the public product catalog.
     */
    public function index(Request $request): Response
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

        return Inertia::render('Catalog/Catalog', [
            'catalog' => (new CatalogResource($products, $collection, $filters))->resolve($request),
        ]);
    }
}
