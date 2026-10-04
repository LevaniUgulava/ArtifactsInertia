<?php

namespace App\Services;

use App\Models\Product;
use App\Models\User;

class FavoriteService
{
    public function add(User $user, string $slug): void
    {
        $product = Product::query()->where('slug', $slug)->firstOrFail();

        $user->favorites()->syncWithoutDetaching([$product->id]);
    }

    public function remove(User $user, string $slug): void
    {
        $product = Product::query()->where('slug', $slug)->firstOrFail();

        $user->favorites()->detach($product->id);
    }
}
