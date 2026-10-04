<?php

namespace App\Services;

use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Enums\ShipmentStatus;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\DeliveryType;
use App\Models\Order;
use App\Models\PromoCode;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class CheckoutService
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function placeOrder(User $user, array $data): Order
    {
        return DB::transaction(function () use ($user, $data): Order {
            /** @var Cart|null $cart */
            $cart = $user->cart()->with(['items', 'promoCode'])->first();

            if ($cart === null || $cart->items->isEmpty()) {
                throw ValidationException::withMessages(['items' => 'Your cart is empty.']);
            }

            $deliveryType = DeliveryType::query()->where('value', $data['delivery_method'])->firstOrFail();
            $subtotal = round(
                $cart->items->sum(fn (CartItem $item): float => (float) $item->price * $item->quantity),
                2,
            );

            $promoCode = ! empty($data['promo_code'])
                ? PromoCode::query()
                    ->where('code', mb_strtoupper((string) $data['promo_code']))
                    ->where('is_active', true)
                    ->first()
                : null;

            $discount = $promoCode === null
                ? 0.0
                : match ($promoCode->type) {
                    'percent' => round($subtotal * ($promoCode->value / 100), 2),
                    default => (float) $promoCode->value,
                };
            $shipping = (float) $deliveryType->price;
            $total = round(max(0.0, $subtotal + $shipping - $discount), 2);

            $cart->forceFill(['promo_code_id' => $promoCode?->id])->save();

            return $user->orders()->create([
                'status' => 'pending',
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'street' => $data['address'],
                'city' => $data['city'],
                'phone' => $data['phone'],
                'delivery_type_id' => $deliveryType->id,
                'promo_code_id' => $promoCode?->id,
                'subtotal' => $subtotal,
                'shipping' => $shipping,
                'discount' => $discount,
                'total' => $total,
                'payment_type' => $data['payment_method'],
                'payment_status' => PaymentStatus::Pending,
                'shipping_status' => ShipmentStatus::Processing,
            ]);
        });
    }

    /**
     * @return array{
     *     cart: Cart|null,
     *     firstName: string,
     *     lastName: string,
     *     deliveryMethods: list<array{id: string, label: string, description: string, icon: string, price: mixed}>,
     *     paymentMethods: list<array{id: string, label: string}>,
     * }
     */
    public function checkoutData(User $user): array
    {
        /** @var Cart|null $cart */
        $cart = $user->cart()
            ->with(['items.variant.product', 'items.variant.media', 'promoCode'])
            ->first();

        [$firstName, $lastName] = array_pad(explode(' ', trim($user->name), 2), 2, '');

        return [
            'cart' => $cart,
            'firstName' => $firstName ?: '',
            'lastName' => $lastName ?? '',
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
        ];
    }
}
