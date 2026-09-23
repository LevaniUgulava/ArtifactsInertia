<?php

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\DeliveryType;
use App\Models\PromoCode;
use App\Models\User;
use App\Models\Variant;
use Database\Seeders\DeliveryTypeSeeder;

beforeEach(function () {
    $this->seed(DeliveryTypeSeeder::class);
});

it('redirects guests to login', function () {
    $this->get('/en/checkout')->assertRedirect('/en/login');
});

it('redirects unverified users to email verification', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get('/en/checkout')
        ->assertRedirect('/en/verification');
});

it('renders checkout with the user cart items', function () {
    $user = User::factory()->create(['email' => 'camille@example.com']);
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
        ->get('/en/checkout')
        ->assertInertia(fn ($page) => $page
            ->component('Checkout/Checkout')
            ->has('checkout.items', 3)
            ->has('checkout.items.0.size')
            ->has('checkout.items.0.color')
            ->has('checkout.deliveryMethods', 3)
            ->has('checkout.paymentMethods', 2)
            ->where('checkout.customer.email', 'camille@example.com')
            ->where('checkout.items.2.name', $variants[2]->product->name)
            ->missing('checkout.customer.card_number'));
});

it('creates an order from the synced cart with recomputed totals', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $variant = Variant::factory()->create(['price' => 100, 'stock' => 5]);

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
        'quantity' => 2,
    ]);

    $this->from('/en/checkout')
        ->actingAs($user)
        ->post('/en/checkout/place-order', [
            'first_name' => 'Camille',
            'last_name' => 'Rousseau',
            'address' => '48 Rue du Faubourg Saint-Honoré',
            'city' => 'Paris',
            'phone' => '+995 555 12 34 56',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'terms' => true,
        ])
        ->assertRedirect('/en/checkout')
        ->assertSessionHas('status', 'checkout-validated');

    $this->assertDatabaseHas('orders', [
        'user_id' => $user->id,
        'status' => 'pending',
        'delivery_type_id' => DeliveryType::query()->where('value', 'express')->value('id'),
        'payment_type' => 'card',
        'payment_status' => 'pending',
        'shipping_status' => 'processing',
        'subtotal' => 200,
        'shipping' => 12,
        'discount' => 0,
        'total' => 212,
    ]);
});

it('applies an active promo code when creating the order', function () {
    PromoCode::factory()->create([
        'code' => 'ATELIER25',
        'type' => 'fixed',
        'value' => 25,
        'is_active' => true,
    ]);

    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $variant = Variant::factory()->create(['price' => 100, 'stock' => 5]);

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
        'quantity' => 2,
    ]);

    $this->from('/en/checkout')
        ->actingAs($user)
        ->post('/en/checkout/place-order', [
            'first_name' => 'Camille',
            'last_name' => 'Rousseau',
            'address' => '48 Rue du Faubourg Saint-Honoré',
            'city' => 'Paris',
            'phone' => '+995 555 12 34 56',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'promo_code' => 'atelier25',
            'terms' => true,
        ])
        ->assertRedirect('/en/checkout')
        ->assertSessionHas('status', 'checkout-validated');

    $this->assertDatabaseHas('orders', [
        'user_id' => $user->id,
        'discount' => 25,
        'subtotal' => 200,
        'shipping' => 12,
        'total' => 187,
    ]);
});

it('rejects raw card fields at the checkout boundary', function () {
    $user = User::factory()->create();

    $this->from('/en/checkout')
        ->actingAs($user)
        ->post('/en/checkout/place-order', [
            'first_name' => 'Camille',
            'last_name' => 'Rousseau',
            'address' => '48 Rue du Faubourg Saint-Honoré',
            'city' => 'Paris',
            'phone' => '+995 555 12 34 56',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'terms' => true,
            'card_number' => '4242424242424242',
        ])
        ->assertSessionHasErrors('card_number');
});

it('rejects invalid phone numbers at the checkout boundary', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $variant = Variant::factory()->create(['price' => 100, 'stock' => 5]);

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
        'quantity' => 1,
    ]);

    $this->from('/en/checkout')
        ->actingAs($user)
        ->post('/en/checkout/place-order', [
            'first_name' => 'Camille',
            'last_name' => 'Rousseau',
            'address' => '48 Rue du Faubourg Saint-Honoré',
            'city' => 'Paris',
            'phone' => '+995 512 34',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'terms' => true,
        ])
        ->assertSessionHasErrors('phone');
});

it('rejects non-international phone numbers at the checkout boundary', function () {
    $user = User::factory()->create();
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $variant = Variant::factory()->create(['price' => 100, 'stock' => 5]);

    CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
        'quantity' => 1,
    ]);

    $this->from('/en/checkout')
        ->actingAs($user)
        ->post('/en/checkout/place-order', [
            'first_name' => 'Camille',
            'last_name' => 'Rousseau',
            'address' => '48 Rue du Faubourg Saint-Honoré',
            'city' => 'Paris',
            'phone' => '555123456',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'terms' => true,
        ])
        ->assertSessionHasErrors('phone');
});

it('rejects checkout submission from an unverified user', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->post('/en/checkout/place-order', [])
        ->assertRedirect('/en/verification');
});
