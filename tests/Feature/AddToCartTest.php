<?php

use App\Models\User;
use App\Models\Variant;

it('adds a variant to the authenticated user cart', function () {
    $user = User::factory()->create();
    $variant = Variant::factory()->create(['stock' => 5]);

    $this->actingAs($user)
        ->postJson('/en/cart/items', [
            'slug' => $variant->product->slug,
            'color' => $variant->color,
            'size' => $variant->size,
        ])
        ->assertOk()
        ->assertJson(['quantity' => 1]);

    $cart = $user->cart;

    expect($cart)->not->toBeNull();
    expect($cart->items)->toHaveCount(1);
    expect($cart->items->first()->variant_id)->toBe($variant->id);
    expect($cart->items->first()->quantity)->toBe(1);
    expect((float) $cart->items->first()->price)->toBe((float) $variant->price);
});

it('increments the quantity when the same variant is added again', function () {
    $user = User::factory()->create();
    $variant = Variant::factory()->create(['stock' => 5]);

    $payload = [
        'slug' => $variant->product->slug,
        'color' => $variant->color,
        'size' => $variant->size,
    ];

    $this->actingAs($user)->postJson('/en/cart/items', $payload)->assertOk();
    $this->actingAs($user)->postJson('/en/cart/items', $payload)->assertJson(['quantity' => 2]);

    expect($user->cart->items->first()->quantity)->toBe(2);
});

it('rejects the request when the stock limit is exceeded', function () {
    $user = User::factory()->create();
    $variant = Variant::factory()->create(['stock' => 1]);

    $payload = [
        'slug' => $variant->product->slug,
        'color' => $variant->color,
        'size' => $variant->size,
    ];

    $this->actingAs($user)->postJson('/en/cart/items', $payload)->assertOk();

    $this->actingAs($user)
        ->postJson('/en/cart/items', $payload)
        ->assertUnprocessable()
        ->assertJsonValidationErrors('size');
});

it('rejects a color and size combination that has no variant', function () {
    $user = User::factory()->create();
    $variant = Variant::factory()->create();

    $this->actingAs($user)
        ->postJson('/en/cart/items', [
            'slug' => $variant->product->slug,
            'color' => 'navy',
            'size' => $variant->size,
        ])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('size');
});

it('rejects guests adding items to the cart', function () {
    $variant = Variant::factory()->create();

    $this->postJson('/en/cart/items', [
        'slug' => $variant->product->slug,
        'color' => $variant->color,
        'size' => $variant->size,
    ])->assertStatus(401);
});
