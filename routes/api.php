<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransaksiController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MenuController;

/*
|--------------------------------------------------------------------------
| PUBLIC (TIDAK PERLU TOKEN)
|--------------------------------------------------------------------------
*/
Route::get('/ping', function () {
    return response()->json(['status' => 'API OK']);
});

Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| PROTECTED (WAJIB api_token)
|--------------------------------------------------------------------------
*/
Route::middleware('api.token')->group(function () {

    Route::get('/menu', [MenuController::class, 'index']);

    Route::post('/menu/set-stok', [MenuController::class, 'setStok']);
    Route::post('/menu/decrease-stok', [MenuController::class, 'decreaseStok']);

    Route::get('/menu/last-update', [MenuController::class, 'lastUpdate']);

    Route::get('/transaksi', [TransaksiController::class, 'index']);
    Route::post('/transaksi', [TransaksiController::class, 'store']);
    Route::delete('/transaksi/{id}', [TransaksiController::class, 'destroy']);
});
