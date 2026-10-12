<?php

use App\Http\Controllers\CatalogController;

Route::get('/{lang}/catalog', [CatalogController::class, 'index'])->name('catalog');
