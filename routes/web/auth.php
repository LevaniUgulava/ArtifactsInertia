<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProfileController;

Route::prefix('{lang}')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::get('/verification', [AuthController::class, 'showVerification'])->name('verification.notice');
    Route::get('/password/update', [AuthController::class, 'showUpdatePassword'])->name('password.update');
    Route::get('/cart', [CartController::class, 'show'])->middleware('auth:sanctum')->name('cart');
    Route::get('/profile', [ProfileController::class, 'show'])->middleware('auth:sanctum')->name('profile');
    Route::get('/account', [ProfileController::class, 'show'])->middleware('auth:sanctum')->name('account');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout');
        Route::post('/checkout/place-order', [CheckoutController::class, 'placeOrder'])->name('checkout.place-order');
    });
});

Route::middleware('signed')->get('/{lang}/verification/verify/{user}/{hash}', [AuthController::class, 'verifyEmail'])
    ->name('verification.verify');

Route::middleware('auth:sanctum', 'throttle:6,1')->post('/verification-notification', [AuthController::class, 'sendVerificationNotification'])
    ->name('verification.send');

Route::middleware('precognition')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
    Route::post('/register', [AuthController::class, 'register'])->name('register.submit');
});

Route::middleware('auth')->post('/logout', [AuthController::class, 'logout'])->name('logout');
