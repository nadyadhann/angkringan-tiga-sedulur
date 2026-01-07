<?php

use Illuminate\Support\Facades\Route;

Route::get('/auth/login', function () {
    return response()->file(public_path('login.html'));
});

