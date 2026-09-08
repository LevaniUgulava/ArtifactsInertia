<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/en');

Route::get('/{lang}', function () {
    return Inertia::render('Home/Home');
})->name('home');



require __DIR__ . '/web/auth.php';
