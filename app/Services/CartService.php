<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CartService
{
    public function addItem(User $user, string $slug, string $color, string $size): int
    {
        $product = Product::query()->where('slug', $slug)->firstOrFail();
        $variant = $product->variants()
            ->where('color', $color)
            ->where('size', $size)
            ->first();

        if ($variant === null) {
            throw ValidationException::withMessages([
                'size' => 'This color and size combination is not available.',
            ]);
        }

        return DB::transaction(function () use ($user, $variant): int {
            $cart = $user->cart()->firstOrCreate();
            $item = $cart->items()->where('variant_id', $variant->id)->lockForUpdate()->first();
            $quantity = ($item?->quantity ?? 0) + 1;

            if ($quantity > $variant->stock) {
                throw ValidationException::withMessages([
                    'size' => 'Not enough stock for this size.',
                ]);
            }

            if ($item === null) {
                $cart->items()->create([
                    'variant_id' => $variant->id,
                    'quantity' => 1,
                    'price' => $variant->price,
                ]);
            } else {
                $item->update(['quantity' => $quantity]);
            }

            return $quantity;
        });
    }

    public function updateQuantity(User $user, CartItem $item, int $quantity): int
    {
        $cartItem = $this->ownedItem($user, $item);

        if ($quantity > $cartItem->variant->stock) {
            throw ValidationException::withMessages([
                'quantity' => 'Not enough stock for this size.',
            ]);
        }

        $cartItem->update(['quantity' => $quantity]);

        return $cartItem->quantity;
    }

    public function remove(User $user, CartItem $item): void
    {
        $this->ownedItem($user, $item)->delete();
    }

    public function saveForLater(User $user, CartItem $item): void
    {
        DB::transaction(function () use ($user, $item): void {
            $cartItem = $this->ownedItem($user, $item);
            $productId = $cartItem->variant?->product_id;

            if ($productId === null) {
                abort(422);
            }

            $cartItem->delete();
            $user->favorites()->syncWithoutDetaching([$productId]);
        });
    }

    private function ownedItem(User $user, CartItem $item): CartItem
    {
        $cart = $user->cart()->first();

        if ($cart === null) {
            throw (new ModelNotFoundException)->setModel(CartItem::class, [$item->id]);
        }

        return $cart->items()->with('variant')->findOrFail($item->id);
    }
}
