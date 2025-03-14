<?php

namespace App\Http\Middleware;

use App\Http\Controllers\UserDataController;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserIsAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authorization = $request->header('Authorization');
        if (!$authorization || !str_starts_with($authorization, "Bearer ")) {
            return response()->json(["message" => "No se proporcionó el token"], 400);
        }

        $token = explode(" ", $authorization)[1];
        $userData = UserDataController::getUserDataFromAccessToken($token);

        if(!$userData) return response()->json(["message" => "Token no válido o expirado"], 401);

        $request->merge(["userData" => $userData]);
        return $next($request);
    }
}
