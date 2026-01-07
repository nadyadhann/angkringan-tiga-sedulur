<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/login.html');
});

Route::get('/login', function () {
    return view('login');
});