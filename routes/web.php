<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/en');

require __DIR__.'/web/auth.php';

Route::get('/{lang}/catalog', [CatalogController::class, 'index'])->name('catalog');
Route::get('/{lang}/products/{product}', [ProductController::class, 'show'])->name('product.show');

Route::get('/{lang}', function () {
    return Inertia::render('Home/Home');
})->name('home');
