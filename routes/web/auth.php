<?php

use App\Http\Controllers\Auth\AuthController;

Route::prefix('{lang}')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::get('/verification', [AuthController::class, 'showVerification'])->name('verification.notice');
    Route::get('/password/update', [AuthController::class, 'showUpdatePassword'])->name('password.update');
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
