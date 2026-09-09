<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Show a public product detail page.
     */
    public function show(Request $request, string $product): Response
    {
        $productModel = Product::query()
            ->with(['variants.media', 'categories', 'collections'])
            ->where('slug', $product)
            ->firstOrFail();

        return Inertia::render('Product/Product', [
            'product' => (new ProductResource($productModel))->resolve(),
        ]);
    }
}
