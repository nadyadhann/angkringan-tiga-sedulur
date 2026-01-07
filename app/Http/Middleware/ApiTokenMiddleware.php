<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class ApiTokenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization');

        if (!$header || !str_starts_with($header, 'Bearer ')) {
            return response()->json([
                'message' => 'Unauthorized (token missing)'
            ], 401);
        }

        // 🔥 potong "Bearer "
        $token = substr($header, 7);

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized (invalid token)'
            ], 401);
        }

        // inject user (opsional)
        $request->merge(['auth_user' => $user]);

        return $next($request);
    }
}
