<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Ulid\Ulid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = [
            "username" => $request->username,
            "password" => $request->password
        ];

        if (!trim($user["username"]) || !trim($user["password"])) {
            return response()->json(["message" => "Se debe enviar username y password"], 400);
        }

        $userId = $this->validateCredentials($user);
        if ($userId == 0) return response()->json(["message" => "Credenciales incorrectas"], 401);

        $accesToken = $this->createAccessToken($userId);
        $refreshToken = $this->createRefreshToken($userId);

        return response()->json(["access_token" => $accesToken, "refresh_token" => $refreshToken]);
    }

    private function validateCredentials($user)
    {
        $userDB = UserDataController::getUserByUsername($user["username"]);
        if (!$userDB) return 0;
        if (!Hash::check($user["password"], $userDB->password)) return 0;
        return $userDB->id;
    }

    private function createAccessToken($userId)
    {
        $user = DB::table('usuarios')
            ->where('id', '=', $userId)
            ->first();
        if (!$user) return null;

        $exp = time() + env('ACCESS_TOKEN_EXPIRATION_SEC');
        $tokenData = [
            "userId" => $user->id,
            "username" => $user->username,
            "exp" => floor($exp),
        ];

        return JWT::encode($tokenData, env('ACCESS_TOKEN_SECRET'),'HS256');
    }

    private function createRefreshToken($userId)
    {
        $now = time();
        $refreshToken = Ulid::generate(true);
        $fecha = date('Y-m-d H:i:s', $now);
        $fecha_caduca = date('Y-m-d H:i:s', $now + env('REFRESH_TOKEN_EXPIRATION_DAYS') * 24 * 60 * 60);

        $tokenDB = [
            "refresh_token" => $refreshToken,
            "usuario_id" => $userId,
            "fecha_generado" => $fecha,
            "fecha_caduca" => $fecha_caduca,
            "activo" => 1
        ];

        DB::table('refresh_tokens')->insert($tokenDB);
        return strval($refreshToken);
    }

    public function refreshToken(Request $request)
    {
        $refreshToken = $request->refresh_token;
        if(!$refreshToken) return response()->json(["message" => "Debe proporcionar el refresh token"], 400);

        $accessToken = $this->refreshAccessToken($refreshToken);
        if(!$accessToken) return response()->json(["message" => "Refresh token no válido o expirado"], 401);
        return response()->json(["access_token" => $accessToken]);
    }

    private function refreshAccessToken($refreshToken)
    {
        $refreshTokenData = DB::table('refresh_tokens')
            ->where('refresh_token', $refreshToken)
            ->where('activo', 1)
            ->first();

        if(!$refreshTokenData) return null;

        if(time() > $refreshTokenData->fecha_caduca){
            $this->invalidateRefreshToken($refreshToken);
            return null;
        }

        return $this->createAccessToken($refreshTokenData->usuario_id);
    }

    public function logout(Request $request)
    {
        $refreshToken = $request->refresh_token;
        if(!$refreshToken) return response()->json(["message" => "Debe proporcionar el refresh token"], 400);

        $this->invalidateRefreshToken($refreshToken);
        return response()->json(["message" => "Sesión cerrada"]);
    }

    private function invalidateRefreshToken($refreshToken){
        DB::table('refresh_tokens')
            ->where('refresh_token', $refreshToken)
            ->update(['activo' => 0]);
    }
}
