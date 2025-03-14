<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Middleware\UserIsAuthenticated;

Route::post('/account/new-user', [RegisterController::class, 'register']);
Route::post('/account/login', [AuthController::class, 'login']);
Route::post('/account/refresh-token', [AuthController::class, 'refreshToken']);

Route::post('/account/logout', [AuthController::class, 'logout'])
    ->middleware(UserIsAuthenticated::class);;

    Route::get('/account/perfil', function (Request $request) {
    return response()->json($request->userData);
})->middleware(UserIsAuthenticated::class);
