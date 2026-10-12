<?php

use App\Http\Controllers\ProductController;

Route::get('/{lang}/products/{product}', [ProductController::class, 'show'])->name('product.show');
