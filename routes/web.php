<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;

Route::get('/auth/login', function () {
    return response()->file(public_path('login.html'));
});

