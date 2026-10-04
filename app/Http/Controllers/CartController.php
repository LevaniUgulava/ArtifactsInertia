<?php

namespace App\Http\Controllers;

use App\Http\Requests\Cart\CartStoreRequest;
use App\Http\Requests\Cart\CartUpdateQuantityRequest;
use App\Http\Resources\Cart\CartResource;
use App\Models\CartItem;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(private readonly CartService $cartService) {}

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

        $data = $request->validated();
        $quantity = $this->cartService->addItem($user, $data['slug'], $data['color'], $data['size']);

        return response()->json(['quantity' => $quantity]);
    }

    /**
     * Update the quantity of a cart item.
     */
    public function updateQuantity(CartUpdateQuantityRequest $request, CartItem $item): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $quantity = $this->cartService->updateQuantity($user, $item, $request->integer('quantity'));

        return response()->json(['quantity' => $quantity]);
    }

    /**
     * Remove a cart item.
     */
    public function remove(Request $request, CartItem $item): HttpResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->cartService->remove($user, $item);

        return response()->noContent();
    }

    /**
     * Move a cart item into the user's favorites (save for later).
     */
    public function saveForLater(Request $request, CartItem $item): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->cartService->saveForLater($user, $item);

        return response()->json(['saved' => true]);
    }
}
