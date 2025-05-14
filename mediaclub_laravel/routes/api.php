<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

//API USERS
Route::prefix('usuarios')->group(function () {
    //Gets

    Route::get('/', [UserController::class, 'index']);
    Route::get('/total', [UserController::class, 'totalUsers']);
    Route::get('/{id}', [UserController::class, 'show']);

    //Post
    Route::post('/registro', [UserController::class, 'registerUser']);
    Route::post('/login', [UserController::class, 'loginUser']);

    //Patch
    Route::patch('/actualizarDato/{id}', [UserController::class, 'update']);

    //Delete
    Route::delete('/eliminar/{id}', [UserController::class, 'delete']);
});

//API TMDB
Route::prefix('movies')->group(function () {

    Route::get('/popular', [TmdbController::class, 'popular']);
});
