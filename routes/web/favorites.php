<?php

use App\Http\Controllers\FavoritesController;

Route::prefix('{lang}')->group(function () {
    Route::get('/favorites', [FavoritesController::class, 'index'])->middleware('auth:sanctum')->name('favorites');
    Route::post('/favorites/{product}', [FavoritesController::class, 'store'])->middleware('auth:sanctum')->name('favorites.store');
    Route::delete('/favorites/{product}', [FavoritesController::class, 'destroy'])->middleware('auth:sanctum')->name('favorites.destroy');
});
