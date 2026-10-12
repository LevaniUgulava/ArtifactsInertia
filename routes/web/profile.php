<?php

use App\Http\Controllers\ProfileController;

Route::prefix('{lang}')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->middleware('auth:sanctum')->name('profile');
    Route::put('/profile/update', [ProfileController::class, 'update'])->middleware('auth:sanctum')->name('profile.update');
    Route::get('/account', [ProfileController::class, 'show'])->middleware('auth:sanctum')->name('account');
});
