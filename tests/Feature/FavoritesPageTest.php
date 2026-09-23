<?php

use App\Models\Product;
use App\Models\User;
use Database\Seeders\CatalogSeeder;

beforeEach(fn () => $this->seed(CatalogSeeder::class));

it('redirects favorite-guests to localized login', function () {
    $this->get('/en/favorites')->assertRedirect('/en/login');
});

it('renders the favorites list for an authenticated user', function () {
    $user = User::factory()->create();
    $product = Product::query()->where('slug', 'cashmere-wrap-coat')->firstOrFail();

    $user->favorites()->sync([$product->id]);

    $this->actingAs($user)
        ->get('/en/favorites')
        ->assertInertia(fn ($page) => $page
            ->component('Profile/Favorites')
            ->has('favorites', 1)
            ->where('favorites.0.id', 'cashmere-wrap-coat')
            ->where('favorites.0.name', 'Cashmere Wrap Coat'));
});

it('renders the empty state when the user has no favorites', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/en/favorites')
        ->assertInertia(fn ($page) => $page
            ->component('Profile/Favorites')
            ->has('favorites', 0));
});

it('adds a product to favorites', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/en/favorites/cashmere-wrap-coat')
        ->assertJson(['favorited' => true]);

    $this->assertDatabaseHas('favorites', [
        'user_id' => $user->id,
        'product_id' => Product::query()->where('slug', 'cashmere-wrap-coat')->value('id'),
    ]);
});

it('removes a product from favorites', function () {
    $user = User::factory()->create();
    $product = Product::query()->where('slug', 'cashmere-wrap-coat')->firstOrFail();

    $user->favorites()->sync([$product->id]);

    $this->actingAs($user)
        ->delete("/en/favorites/{$product->slug}")
        ->assertJson(['favorited' => false]);

    $this->assertDatabaseMissing('favorites', [
        'user_id' => $user->id,
        'product_id' => $product->id,
    ]);
});

it('is idempotent when favoriting the same product twice', function () {
    $user = User::factory()->create();
    $product = Product::query()->where('slug', 'cashmere-wrap-coat')->firstOrFail();

    $this->actingAs($user)->post('/en/favorites/cashmere-wrap-coat');
    $this->actingAs($user)->post('/en/favorites/cashmere-wrap-coat');

    $this->assertDatabaseCount('favorites', 1);
});

it('exposes the favorited flag on the product page', function () {
    $user = User::factory()->create();
    $product = Product::query()->where('slug', 'cashmere-wrap-coat')->firstOrFail();

    $user->favorites()->sync([$product->id]);

    $this->actingAs($user)
        ->get('/en/products/cashmere-wrap-coat')
        ->assertInertia(fn ($page) => $page
            ->component('Product/Product')
            ->where('favorited', true));
});

it('defaults the favorited flag to false for guests', function () {
    $this->get('/en/products/cashmere-wrap-coat')
        ->assertInertia(fn ($page) => $page
            ->component('Product/Product')
            ->where('favorited', false));
});
