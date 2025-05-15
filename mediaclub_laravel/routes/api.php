<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

//API USERS

Route::prefix('usuarios')->group(function () {
    Route::post('/registro', [UserController::class, 'registerUser']);
    Route::post('/login', [UserController::class, 'loginUser']);
    // Route::get('/{id}', [UserController::class, 'show']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/amigos', [UserController::class, 'listaAmigos']);
        Route::get('/solicitudes', [UserController::class, 'listaSolicitudes']);
        Route::patch('/actualizarDato', [UserController::class, 'update']);
        Route::delete('/eliminar', [UserController::class, 'delete']);
        Route::post('/logout', [UserController::class, 'logoutUser']);
        Route::get('/perfil', [UserController::class, 'getProfile']);
    });
});

//API TMDB
Route::prefix('movies')->group(function () {

    Route::get('/popular', [TmdbController::class, 'popular']);
});
