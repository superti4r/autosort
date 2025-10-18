<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Pages\DashboardController;
use App\Http\Controllers\Pages\RealtimeCameraController;
use App\Http\Controllers\Pages\ReportDataController;
use App\Http\Controllers\Pages\SortingDataController;
use App\Http\Controllers\Pages\UserManageController;
use App\Http\Controllers\Pages\UserProfileController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login');

Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store'])->name('login.attempt');

    Route::get('/forgot-password', [ForgotPasswordController::class, 'show'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'store'])->name('password.email');

    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'show'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'store'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');

    Route::get('/dashboard/profile', [UserProfileController::class, 'show'])->name('profile');
    Route::put('/dashboard/profile', [UserProfileController::class, 'update'])->name('profile.update');

    Route::get('/dashboard/users', [UserManageController::class, 'show'])->name('users');
    Route::get('/dashboard/users/create', [UserManageController::class, 'create'])->name('users.create');
    Route::post('/dashboard/users', [UserManageController::class, 'store'])->name('users.store');
    Route::get('/dashboard/users/{user}/edit', [UserManageController::class, 'edit'])->name('users.edit');
    Route::put('/dashboard/users/{user}', [UserManageController::class, 'update'])->name('users.update');
    Route::delete('/dashboard/users/{user}', [UserManageController::class, 'destroy'])->name('users.destroy');

    Route::get('/dashboard/camera', [RealtimeCameraController::class, 'show'])->name('camera');

    Route::get('/dashboard/sorting-data', [SortingDataController::class, 'show'])->name('sorting-data');

    Route::get('/dashboard/report-data', [ReportDataController::class, 'show'])->name('report-data');
    Route::post('/logout', [LogoutController::class, '__invoke'])->name('logout');
});
