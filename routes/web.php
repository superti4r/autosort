<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::get('/login', function () {
    return Inertia::render('auth/login');
})->name('login');
