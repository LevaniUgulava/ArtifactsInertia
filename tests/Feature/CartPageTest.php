<?php

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Variant;

it('renders the cart for an authenticated user', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);

    $variants = Variant::factory()->count(3)->create();

    foreach ($variants as $index => $variant) {
        CartItem::factory()->create([
            'cart_id' => $cart->id,
            'variant_id' => $variant->id,
            'quantity' => $index + 1,
        ]);
    }

    $this->actingAs($user)
        ->get('/en/cart')
        ->assertInertia(fn ($page) => $page
            ->component('Cart/Cart')
            ->has('cart.items', 3)
            ->where('cart.shipping', 12)
            ->where('cart.items.0.quantity', 1)
            ->where('cart.items.1.quantity', 2)
            ->where('cart.items.2.name', $variants[2]->product->name));
});

it('redirects guests away from the cart', function () {
    $this->get('/en/cart')->assertRedirect('/en/login');
});

it('shares the total cart quantity for the header badge', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $variant = Variant::factory()->create();

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
        'quantity' => 2,
    ]);

    $this->actingAs($user)
        ->get('/en/cart')
        ->assertInertia(fn ($page) => $page->where('cartCount', 2));
});

it('shares the sum of quantities, not the line-item count', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => Variant::factory()->create()->id,
        'quantity' => 2,
    ]);

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => Variant::factory()->create()->id,
        'quantity' => 3,
    ]);

    $this->actingAs($user)
        ->get('/en/cart')
        ->assertInertia(fn ($page) => $page->where('cartCount', 5));
});

it('shares a zero cart count for guests', function () {
    $this->get('/en/login')->assertInertia(fn ($page) => $page->where('cartCount', 0));
});

it('moves a cart item into favorites when saved for later', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $variant = Variant::factory()->create();
    $item = CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
    ]);

    $this->actingAs($user)
        ->post("/en/cart/items/{$item->id}/save")
        ->assertJson(['saved' => true]);

    $this->assertDatabaseMissing('cart_items', ['id' => $item->id]);
    $this->assertDatabaseHas('favorites', [
        'user_id' => $user->id,
        'product_id' => $variant->product_id,
    ]);
});
