<?php

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Variant;

function makeCartItem(int $stock = 10): array
{
    $user = User::factory()->create();
    $variant = Variant::factory()->create(['stock' => $stock]);
    $cart = Cart::factory()->create(['user_id' => $user->id]);
    $cartItem = CartItem::factory()->create([
        'cart_id' => $cart->id,
        'variant_id' => $variant->id,
        'quantity' => 1,
    ]);

    return [$user, $cartItem];
}

it('updates the quantity of a cart item', function () {
    [$user, $cartItem] = makeCartItem();

    $this->actingAs($user)
        ->patchJson("/en/cart/items/{$cartItem->id}", ['quantity' => 3])
        ->assertOk()
        ->assertJson(['quantity' => 3]);

    expect($cartItem->fresh()->quantity)->toBe(3);
});

it('rejects updating a cart item to zero or less', function () {
    [$user, $cartItem] = makeCartItem();

    $this->actingAs($user)
        ->patchJson("/en/cart/items/{$cartItem->id}", ['quantity' => 0])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('quantity');
});

it('rejects updating the quantity beyond the available stock', function () {
    [$user, $cartItem] = makeCartItem(stock: 2);

    $this->actingAs($user)
        ->patchJson("/en/cart/items/{$cartItem->id}", ['quantity' => 5])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('quantity');
});

it('removes a cart item', function () {
    [$user, $cartItem] = makeCartItem();

    $this->actingAs($user)
        ->deleteJson("/en/cart/items/{$cartItem->id}")
        ->assertNoContent();

    expect(CartItem::find($cartItem->id))->toBeNull();
});

it('cannot update another user cart item', function () {
    [, $cartItem] = makeCartItem();
    $otherUser = User::factory()->create();

    $this->actingAs($otherUser)
        ->patchJson("/en/cart/items/{$cartItem->id}", ['quantity' => 2])
        ->assertNotFound();
});

it('cannot remove another user cart item', function () {
    [, $cartItem] = makeCartItem();
    $otherUser = User::factory()->create();

    $this->actingAs($otherUser)
        ->deleteJson("/en/cart/items/{$cartItem->id}")
        ->assertNotFound();
});

it('rejects guests from updating cart items', function () {
    [, $cartItem] = makeCartItem();

    $this->patchJson("/en/cart/items/{$cartItem->id}", ['quantity' => 2])->assertStatus(401);
});
