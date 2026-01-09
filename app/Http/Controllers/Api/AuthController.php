<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
{
    return response()->json([
        'request_all' => $request->all(),
        'username' => $request->username,
        'password' => $request->password,
        ]);

        // Cari user berdasarkan username
        $user = User::where('username', $request->username)->first();

        // Jika user tidak ada atau password salah
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Nama Pengguna dan Kata Sandi Tidak Valid!'
            ], 401);
        }

        // Buat token login
        $token = Str::random(40);

        // 🔥 SIMPAN TOKEN KE DATABASE
        $user->api_token = $token;
        $user->save();

        // Kirim token ke frontend
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'username' => $user->username
            ]
        ]);
    }
}
