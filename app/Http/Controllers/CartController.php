<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cart\CartStoreRequest;
use App\Http\Requests\Cart\CartUpdateQuantityRequest;
use App\Http\Resources\Cart\CartResource;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\User;
use App\Models\Variant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Show the authenticated user's shopping cart.
     */
    public function show(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $cart = $user->cart()
            ->with(['items.variant.product', 'items.variant.media', 'promoCode'])
            ->first();

        return Inertia::render('Cart/Cart', [
            'cart' => (new CartResource($cart))->resolve(),
        ]);
    }

    /**
     * Add a product variant to the authenticated user's cart.
     */
    public function store(CartStoreRequest $request): JsonResponse
    {

        /** @var User $user */
        $user = $request->user();

        $product = Product::query()->where('slug', $request->slug)->first();

        $variant = $product->variants()
            ->where('color', $request->color)
            ->where('size', $request->size)
            ->first();

        if ($variant === null) {
            throw ValidationException::withMessages([
                'size' => 'This color and size combination is not available.',
            ]);
        }

        $quantity = DB::transaction(function () use ($user, $variant): int {
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

        return response()->json(['quantity' => $quantity]);
    }

    /**
     * Update the quantity of a cart item.
     */
    public function updateQuantity(CartUpdateQuantityRequest $request, CartItem $item): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $cartItem = $user->cart?->items()->findOrFail($item->id);

        abort_if($cartItem === null, 404);

        if ($request->quantity > $cartItem->variant->stock) {
            throw ValidationException::withMessages([
                'quantity' => 'Not enough stock for this size.',
            ]);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json(['quantity' => $cartItem->quantity]);
    }

    /**
     * Remove a cart item.
     */
    public function remove(Request $request, CartItem $item): HttpResponse
    {
        /** @var User $user */
        $user = $request->user();

        $cartItem = $user->cart?->items()->findOrFail($item->id);

        abort_if($cartItem === null, 404);

        $cartItem->delete();

        return response()->noContent();
    }

    /**
     * Move a cart item into the user's favorites (save for later).
     */
    public function saveForLater(Request $request, CartItem $item): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $cartItem = $user->cart?->items()->findOrFail($item->id);

        abort_if($cartItem === null, 404);

        $productId = $cartItem->variant?->product_id;

        abort_if($productId === null, 422);

        DB::transaction(function () use ($user, $cartItem, $productId): void {
            $cartItem->delete();
            $user->favorites()->syncWithoutDetaching([$productId]);
        });

        return response()->json(['saved' => true]);
    }
}
