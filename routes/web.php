<?php

use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return response()->file(public_path('login.html'));
});
