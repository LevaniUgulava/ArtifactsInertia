<?php

namespace App\Http\Controllers;

use App\Http\Requests\Checkout\PlaceOrderRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        return Inertia::render('Checkout/Checkout', [
            'status' => session('status'),
            'checkout' => [
                'customer' => [
                    'first_name' => 'Camille',
                    'last_name' => 'Rousseau',
                    'email' => $user->email,
                    'address' => '48 Rue du Faubourg Saint-Honoré',
                    'city' => 'Paris',
                    'postal_code' => '75008',
                    'country' => 'FR',
                    'phone' => '+33 6 12 34 56 78',
                ],
                'items' => [
                    [
                        'id' => 'structured-blazer',
                        'name' => 'Structured Blazer',
                        'variant' => 'Cream / Size 38',
                        'quantity' => 1,
                        'price' => 485,
                        'image' => 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=240&q=85',
                    ],
                    [
                        'id' => 'silk-lace-camisole',
                        'name' => 'Silk Lace Camisole',
                        'variant' => 'Noir / Size S',
                        'quantity' => 1,
                        'price' => 195,
                        'image' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=240&q=85',
                    ],
                    [
                        'id' => 'cashmere-wrap-scarf',
                        'name' => 'Cashmere Wrap Scarf',
                        'variant' => 'Camel / One Size',
                        'quantity' => 1,
                        'price' => 220,
                        'image' => 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=240&q=85',
                    ],
                ],
                'deliveryMethods' => [
                    ['id' => 'express', 'label' => 'Express Delivery', 'description' => '2–3 business days', 'price' => 12],
                    ['id' => 'standard', 'label' => 'Standard Shipping', 'description' => '5–7 business days', 'price' => 0],
                    ['id' => 'next_day', 'label' => 'Next Day', 'description' => 'Next business day by 6pm', 'price' => 24],
                ],
                'paymentMethods' => [
                    ['id' => 'card', 'label' => 'Card'],
                    ['id' => 'apple_pay', 'label' => 'Apple Pay'],
                    ['id' => 'google_pay', 'label' => 'Google Pay'],
                    ['id' => 'paypal', 'label' => 'PayPal'],
                ],
                'taxRate' => 0.2,
            ],
        ]);
    }

    /**
     * Validate checkout details until payment and order persistence are connected.
     */
    public function placeOrder(PlaceOrderRequest $request): RedirectResponse
    {
        return back()->with('status', 'checkout-validated');
    }
}
