<?php

namespace App\Http\Controllers;

use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Enums\ShipmentStatus;
use App\Http\Requests\Checkout\PlaceOrderRequest;
use App\Http\Resources\Cart\ItemsResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\DeliveryType;
use App\Models\PromoCode;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    /**
     * Show the authenticated and verified user's checkout page.
     */
    public function show(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        /** @var Cart|null $cart */
        $cart = $user->cart()
            ->with(['items.variant.product', 'items.variant.media', 'promoCode'])
            ->first();

        [$firstName, $lastName] = array_pad(explode(' ', trim($user->name), 2), 2, '');

        return Inertia::render('Checkout/Checkout', [
            'status' => session('status'),
            'checkout' => [
                'customer' => [
                    'first_name' => $firstName ?: '',
                    'last_name' => $lastName ?? '',
                    'email' => $user->email,
                    'address' => '',
                    'city' => '',
                    'phone' => '',
                ],
                'items' => ItemsResource::collection($cart?->items ?? collect())->resolve($request),
                'deliveryMethods' => DeliveryType::query()
                    ->orderBy('price')
                    ->get(['value', 'name', 'description', 'icon', 'price'])
                    ->map(fn (DeliveryType $deliveryType): array => [
                        'id' => $deliveryType->value,
                        'label' => $deliveryType->name,
                        'description' => $deliveryType->description,
                        'icon' => $deliveryType->icon,
                        'price' => $deliveryType->price,
                    ])
                    ->all(),
                'paymentMethods' => collect(PaymentType::cases())
                    ->map(fn (PaymentType $paymentType): array => [
                        'id' => $paymentType->value,
                        'label' => str($paymentType->value)->headline()->toString(),
                    ])
                    ->all(),
                'promoCode' => $cart?->promoCode?->code ?? null,
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

        $cart = $user->cart()
            ->with(['items', 'promoCode'])
            ->first();

        if ($cart === null || $cart->items->isEmpty()) {
            throw ValidationException::withMessages(['items' => 'Your cart is empty.']);
        }

        $deliveryType = DeliveryType::query()
            ->where('value', $request->validated('delivery_method'))
            ->firstOrFail();

        $subtotal = round(
            $cart->items->sum(fn (CartItem $item): float => (float) $item->price * $item->quantity),
            2,
        );

        $promoCode = $request->validated('promo_code')
            ? PromoCode::query()
                ->where('code', mb_strtoupper($request->validated('promo_code')))
                ->where('is_active', true)
                ->first()
            : null;

        $discount = $promoCode !== null
            ? match ($promoCode->type) {
                'percent' => round($subtotal * ($promoCode->value / 100), 2),
                default => (float) $promoCode->value,
            }
        : 0.0;

        $shipping = (float) $deliveryType->price;
        $total = round(max(0.0, $subtotal + $shipping - $discount), 2);

        $cart->forceFill(['promo_code_id' => $promoCode?->id])->save();

        $user->orders()->create([
            'status' => 'pending',
            'first_name' => $request->validated('first_name'),
            'last_name' => $request->validated('last_name'),
            'street' => $request->validated('address'),
            'city' => $request->validated('city'),
            'phone' => $request->validated('phone'),
            'delivery_type_id' => $deliveryType->id,
            'promo_code_id' => $promoCode?->id,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'discount' => $discount,
            'total' => $total,
            'payment_type' => $request->validated('payment_method'),
            'payment_status' => PaymentStatus::Pending,
            'shipping_status' => ShipmentStatus::Processing,
        ]);

        return back()->with('status', 'checkout-validated');
    }
}
