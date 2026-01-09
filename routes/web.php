<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;

Route::get('/auth/login', function () {
    return response()->file(public_path('login.html'));
});

/**
 * ROUTE SEMENTARA UNTUK RESET PASSWORD
 * HAPUS SETELAH SELESAI
 */
Route::get('/__reset_password_123', function () {
    return Hash::make('123');
});
