<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Show the authenticated user's shopping cart.
     */
    public function show(): Response
    {
        return Inertia::render('Cart/Cart', [
            'cart' => [
                'shipping' => 12,
                'taxRate' => 0.08,
                'items' => [
                    [
                        'id' => 'cashmere-blend-overshirt',
                        'name' => 'Cashmere Blend Overshirt',
                        'price' => 485,
                        'size' => 'M',
                        'color' => 'Camel',
                        'colorHex' => '#c69768',
                        'quantity' => 1,
                        'image' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=320&q=85',
                    ],
                    [
                        'id' => 'silk-structured-blouse',
                        'name' => 'Silk Structured Blouse',
                        'price' => 210,
                        'size' => 'S',
                        'color' => 'Navy',
                        'colorHex' => '#19334f',
                        'quantity' => 2,
                        'image' => 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=320&q=85',
                    ],
                    [
                        'id' => 'italian-leather-belt',
                        'name' => 'Italian Leather Belt',
                        'price' => 145,
                        'size' => '85cm',
                        'color' => 'Dark Brown',
                        'colorHex' => '#5a2d16',
                        'quantity' => 1,
                        'image' => 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=320&q=85',
                    ],
                ],
            ],
        ]);
    }
}
