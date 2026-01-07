<?php

use Illuminate\Support\Facades\Route;

Route::get('/auth/login', function () {
    return response()->file(public_path('login.html'));
});

use Illuminate\Support\Facades\Hash;

Route::get('/debug-hash', function () {
    $hash = 'PASTE_HASH_DARI_DATABASE_DI_SINI';
    return Hash::check('123', $hash) ? 'HASH OK' : 'HASH GAGAL';
});
