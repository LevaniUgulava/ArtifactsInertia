<?php

use App\Http\Controllers\CartController;

Route::prefix('{lang}')->group(function () {
    Route::get('/cart', [CartController::class, 'show'])->middleware('auth:sanctum')->name('cart');
    Route::post('/cart/items', [CartController::class, 'store'])->middleware('auth:sanctum')->name('cart.items.store');
    Route::patch('/cart/items/{item}', [CartController::class, 'updateQuantity'])->middleware('auth:sanctum')->name('cart.items.update');
    Route::delete('/cart/items/{item}', [CartController::class, 'remove'])->middleware('auth:sanctum')->name('cart.items.destroy');
    Route::post('/cart/items/{item}/save', [CartController::class, 'saveForLater'])->middleware('auth:sanctum')->name('cart.items.save');
});
