<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/en');

require __DIR__.'/web/auth.php';

Route::get('/{lang}', function () {
    return Inertia::render('Home/Home');
})->name('home');
