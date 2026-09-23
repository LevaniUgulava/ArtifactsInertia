<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the authenticated user's profile dashboard.
     */
    public function show(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render('Profile/Profile', [
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'memberSince' => $user->created_at?->format('F Y'),
                'avatarUrl' => 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=85',
                'stats' => [
                    ['label' => 'Orders', 'value' => 12],
                    ['label' => 'Saved', 'value' => 5],
                    ['label' => 'Reviews', 'value' => 3],
                ],
                'orders' => [
                    [
                        'id' => '#AS-20247891',
                        'date' => 'December 14, 2024',
                        'itemCount' => '2 items',
                        'status' => 'Delivered',
                        'statusTone' => 'success',
                        'total' => '₾485.00',
                        'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=240&q=85',
                    ],
                    [
                        'id' => '#AS-20247652',
                        'date' => 'November 28, 2024',
                        'itemCount' => '1 item',
                        'status' => 'In Transit',
                        'statusTone' => 'info',
                        'total' => '₾720.00',
                        'image' => 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=240&q=85',
                    ],
                    [
                        'id' => '#AS-20247410',
                        'date' => 'October 5, 2024',
                        'itemCount' => '3 items',
                        'status' => 'Delivered',
                        'statusTone' => 'success',
                        'total' => '₾312.00',
                        'image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=240&q=85',
                    ],
                ],
            ],
        ]);
    }
}
