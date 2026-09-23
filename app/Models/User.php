<?php

namespace App\Models;

use App\Notifications\EmailVerification;
use Database\Factories\UserFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\URL;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function cart(): HasOne
    {
        return $this->hasOne(Cart::class);
    }

    /**
     * Calculate the user's cart totals, applying the promo code if one is set.
     *
     * @return array{subtotal: float, discount: float, total: float}
     */
    public function cartTotals(): array
    {
        $cart = $this->cart()
            ->with(['items', 'promoCode'])
            ->first();

        $subtotal = round(
            $cart?->items->sum(fn (CartItem $item): float => $item->price * $item->quantity) ?? 0.0,
            2,
        );

        $discount = 0.0;
        if ($cart?->promoCode?->is_active) {
            $discount = round($subtotal * ($cart->promoCode->value / 100), 2);
        }

        return [
            'subtotal' => $subtotal,
            'discount' => $discount,
            'total' => round($subtotal - $discount, 2),
        ];
    }

    public function sendEmailVerificationNotification(): void
    {
        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'user' => $this->getKey(),
                'hash' => sha1($this->getEmailForVerification()),
            ],
        );

        $this->notify(new EmailVerification($verificationUrl));
    }
}
