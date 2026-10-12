<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/ka');

require __DIR__.'/web/home.php';
require __DIR__.'/web/catalog.php';
require __DIR__.'/web/product.php';
require __DIR__.'/web/auth.php';
require __DIR__.'/web/cart.php';
require __DIR__.'/web/favorites.php';
require __DIR__.'/web/profile.php';
require __DIR__.'/web/checkout.php';
