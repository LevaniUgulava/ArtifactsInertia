<?php

use App\Http\Controllers\CheckoutController;

Route::prefix('{lang}')->group(function () {
    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('/checkout', [CheckoutController::class, 'show'])->name('checkout');
        Route::post('/checkout/place-order', [CheckoutController::class, 'placeOrder'])->name('checkout.place-order');
    });
});
