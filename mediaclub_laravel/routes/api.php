<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

//API USERS
Route::prefix('usuarios')->group(function () {
    Route::get('/', [userController::class, 'index']);
    Route::get('/{id}', [userController::class, 'show']);
    Route::post('/', [userController::class, 'store']);
    Route::put('/{id}', [userController::class, 'update']);
    Route::patch('/{id}', [userController::class, 'updatePartial']);
    Route::delete('/{id}', [userController::class, 'delete']);
});

//API TMDB
Route::prefix('movies')->group(function () {
    // Route::get('/', [MovieController::class, 'index']);
    Route::get('/popular', [TmdbController::class, 'popular']);
});
