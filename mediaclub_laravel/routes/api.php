<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

//API USERS
Route::prefix('usuarios')->group(function () {
    //Gets

    Route::get('/', [userController::class, 'index']);
    Route::get('/{id}', [userController::class, 'show']);

    // Route::middleware('auth:sanctum')->get('/', [userController::class, 'index']);

    //Post
    Route::post('/', [userController::class, 'store']);

    //Put
    Route::put('/{id}', [userController::class, 'update']);

    //Patch
    Route::patch('/{id}', [userController::class, 'updatePartial']);

    //Delete
    Route::delete('/{id}', [userController::class, 'delete']);
});

//API TMDB
Route::prefix('movies')->group(function () {

    Route::get('/popular', [TmdbController::class, 'popular']);
});
