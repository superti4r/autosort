<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::get('/forgot-password', function () {
    return Inertia::render('auth/forgot-password');
})->name('password.request');

Route::get('/reset-password/{token}', function (string $token) {
    return Inertia::render('auth/reset-password', [
        'token' => $token,
        'email' => request('email'),
    ]);
})->name('password.reset');
