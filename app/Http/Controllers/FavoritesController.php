<?php

namespace App\Http\Controllers;

use App\Http\Resources\Catalog\CatalogProductResource;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FavoritesController extends Controller
{
    /**
     * Show the authenticated user's saved (favorited) products.
     */
    public function index(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $favorites = $user->favorites()
            ->with(['variants.media', 'categories', 'collections'])
            ->orderByPivot('created_at', 'desc')
            ->get();

        return Inertia::render('Profile/Favorites', [
            'favorites' => CatalogProductResource::collection($favorites)->resolve($request),
        ]);
    }

    /**
     * Favorite a product (idempotent) by its slug.
     */
    public function store(Request $request, string $product): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $productModel = Product::query()->where('slug', $product)->firstOrFail();

        $user->favorites()->syncWithoutDetaching([$productModel->id]);

        return response()->json(['favorited' => true]);
    }

    /**
     * Remove a product from the authenticated user's favorites by its slug.
     */
    public function destroy(Request $request, string $product): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $productModel = Product::query()->where('slug', $product)->firstOrFail();

        $user->favorites()->detach($productModel->id);

        return response()->json(['favorited' => false]);
    }
}
