<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\Variant;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'products' => Product::count(),
                'variants' => Variant::count(),
                'categories' => Category::count(),
                'collections' => Collection::count(),
            ],
            'inventory' => [
                'lowStock' => Variant::whereBetween('stock', [1, 5])->count(),
                'outOfStock' => Variant::where('stock', 0)->count(),
            ],
            'recentProducts' => Product::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'slug'])
                ->map(fn (Product $product): array => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                ])
                ->values()
                ->all(),
        ]);
    }
}
