<?php

namespace App\Http\Controllers;

use App\Http\Requests\Checkout\PlaceOrderRequest;
use App\Http\Resources\Cart\ItemsResource;
use App\Models\User;
use App\Services\CheckoutService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function __construct(private readonly CheckoutService $checkoutService) {}

    /**
     * Show the authenticated and verified user's checkout page.
     */
    public function show(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $checkoutData = $this->checkoutService->checkoutData($user);

        return Inertia::render('Checkout/Checkout', [
            'status' => session('status'),
            'checkout' => [
                'customer' => [
                    'first_name' => $checkoutData['firstName'],
                    'last_name' => $checkoutData['lastName'],
                    'email' => $user->email,
                    'address' => '',
                    'city' => '',
                    'phone' => '',
                ],
                'items' => ItemsResource::collection($checkoutData['cart']?->items ?? collect())->resolve($request),
                'deliveryMethods' => $checkoutData['deliveryMethods'],
                'paymentMethods' => $checkoutData['paymentMethods'],
                'promoCode' => $checkoutData['cart']?->promoCode?->code ?? null,
            ],
        ]);
    }

    /**
     * Validate checkout details and create the order with recomputed totals.
     */
    public function placeOrder(PlaceOrderRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $this->checkoutService->placeOrder($user, $request->validated());

        return back()->with('status', 'checkout-validated');
    }
}
