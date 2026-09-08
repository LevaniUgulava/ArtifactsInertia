<?php


use Inertia\Inertia;


Route::prefix('{lang}')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');

    Route::get('/verification', function () {
        return Inertia::render('Auth/Verification');
    })->name('verification');

    Route::get('/password/update', function () {
        return Inertia::render('Auth/UpdatePassword');
    })->name('password.update');

});
