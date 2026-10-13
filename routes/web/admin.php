<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProductController;

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::get('/login', [AuthController::class, 'showAdminLogin'])->name('login');
    Route::middleware('precognition')->post('/login', [AuthController::class, 'adminLogin'])->name('login.submit');
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'role:admin'])
    ->group(function (): void {
        Route::redirect('/', '/admin/dashboard')->name('index');
        Route::get('/dashboard', DashboardController::class)->name('dashboard');
        Route::resource('products', ProductController::class)->except(['show']);
        Route::resource('categories', CategoryController::class)->except(['show']);
        Route::resource('collections', CollectionController::class)->except(['show']);
        Route::get('/media', [MediaController::class, 'index'])->name('media.index');
    });
