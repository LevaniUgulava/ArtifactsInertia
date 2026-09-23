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
            ->where('cart.taxRate', 0.08)
            ->where('cart.items.0.quantity', 1)
            ->where('cart.items.1.quantity', 2)
            ->where('cart.items.2.name', $variants[2]->product->name));
});

it('redirects guests away from the cart', function () {
    $this->get('/en/cart')->assertRedirect('/en/login');
});
