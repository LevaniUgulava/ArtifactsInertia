<?php

use App\Models\User;

it('redirects guests to login', function () {
    $this->get('/en/checkout')->assertRedirect('/en/login');
});

it('redirects unverified users to email verification', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->get('/en/checkout')
        ->assertRedirect('/en/verification');
});

it('renders checkout only for a verified user', function () {
    $user = User::factory()->create(['email' => 'camille@example.com']);

    $this->actingAs($user)
        ->get('/en/checkout')
        ->assertInertia(fn ($page) => $page
            ->component('Checkout/Checkout')
            ->has('checkout.items', 3)
            ->has('checkout.paymentMethods', 4)
            ->where('checkout.customer.email', 'camille@example.com')
            ->missing('checkout.customer.card_number'));
});

it('validates checkout details for a verified user without accepting card data', function () {
    $user = User::factory()->create();

    $this->from('/en/checkout')
        ->actingAs($user)
        ->post('/en/checkout/place-order', [
            'first_name' => 'Camille',
            'last_name' => 'Rousseau',
            'address' => '48 Rue du Faubourg Saint-Honoré',
            'city' => 'Paris',
            'postal_code' => '75008',
            'country' => 'FR',
            'phone' => '+33 6 12 34 56 78',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'terms' => true,
        ])
        ->assertRedirect('/en/checkout')
        ->assertSessionHas('status', 'checkout-validated');
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
            'postal_code' => '75008',
            'country' => 'FR',
            'phone' => '+33 6 12 34 56 78',
            'delivery_method' => 'express',
            'payment_method' => 'card',
            'terms' => true,
            'card_number' => '4242424242424242',
        ])
        ->assertSessionHasErrors('card_number');
});

it('rejects checkout submission from an unverified user', function () {
    $user = User::factory()->unverified()->create();

    $this->actingAs($user)
        ->post('/en/checkout/place-order', [])
        ->assertRedirect('/en/verification');
});
