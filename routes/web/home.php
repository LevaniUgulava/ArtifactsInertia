<?php

use App\Http\Controllers\HomeController;

Route::get('/{lang}', [HomeController::class, 'index'])->name('home');
