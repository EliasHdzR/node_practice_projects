<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $new_user = [
            "username" => $request->username,
            "password" => bcrypt($request->password),
            "nombre" => $request->nombred,
            "apellidos" => $request->apellidos,
            "tipo_usuario" => "user",
            "activo" => 1
        ];

        if(!trim($new_user["username"]) || !trim($new_user["password"]) || !trim($new_user["nombre"])){
            return response()->json(["message" => "Faltan datos obligatorios"], 400);
        }

        if(UserDataController::getUserByUsername($new_user["username"])){
            return response()->json(["message" => "El usuario ya existe"], 409);
        }

        DB::beginTransaction();
        try {
            DB::table('usuarios')->insert($new_user);
            DB::commit();
            return response()->json(["message" => "Usuario creado correctamente"], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["message" => "Error al crear el usuario", $e], 500);
        }
    }
}
