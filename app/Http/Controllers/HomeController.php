<?php

namespace App\Http\Controllers;

use App\Http\Resources\Catalog\CatalogProductResource;
use App\Models\Collection as ProductCollection;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the storefront home page.
     */
    public function index(Request $request): Response
    {
        $newArrivals = Product::query()
            ->with(['variants.media', 'categories', 'collections'])
            ->withMin('variants', 'price')
            ->latest()
            ->limit(4)
            ->get();

        $trendingProducts = Product::query()
            ->with(['variants.media', 'categories', 'collections'])
            ->withMin('variants', 'price')
            ->whereNotNull('badge')
            ->latest()
            ->limit(4)
            ->get();

        $collections = ProductCollection::query()
            ->whereIn('slug', ['womens', 'mens'])
            ->get()
            ->map(fn (ProductCollection $collection): array => [
                'name' => $collection->name,
                'slug' => $collection->slug,
                'image' => $collection->image,
            ])
            ->values()
            ->all();

        return Inertia::render('Home/Home', [
            'newArrivals' => CatalogProductResource::collection($newArrivals)->resolve($request),
            'trendingProducts' => CatalogProductResource::collection($trendingProducts)->resolve($request),
            'collections' => $collections,
        ]);
    }
}
