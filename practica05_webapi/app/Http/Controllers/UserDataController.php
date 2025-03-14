<?php

namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\DB;

class UserDataController extends Controller
{
    public static function getUserDataFromAccessToken($token)
    {
        if(!$token) return response()->json(["message" => "No se proporcionó el token"], 400);

        try {
            $secretKey = env('ACCESS_TOKEN_SECRET');
            $tokenData = JWT::decode($token, new Key($secretKey, 'HS256'));
            return self::getUserByUserId($tokenData->userId);
        } catch (\Exception $e) {
            return null;
        }
    }

    public static function getUserByUserId($userId)
    {
        $user = DB::table('usuarios')
            ->where('id', '=', $userId)
            ->where('activo', '=', '1')
            ->first();
        return array($user);
    }

    public static function getUserByUsername($username)
    {
        return DB::table('usuarios')
            ->where('username', '=', $username)
            ->where('activo', '=', '1')
            ->first();
    }
}
