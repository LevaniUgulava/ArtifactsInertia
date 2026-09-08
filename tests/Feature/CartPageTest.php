<?php

use App\Models\User;

it('renders the cart for an authenticated user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/en/cart')
        ->assertInertia(fn ($page) => $page
            ->component('Cart/Cart')
            ->has('cart.items', 3)
            ->where('cart.items.1.quantity', 2)
            ->where('cart.items.2.name', 'Italian Leather Belt'));
});

it('redirects guests away from the cart', function () {
    $this->get('/en/cart')->assertRedirect('/en/login');
});
