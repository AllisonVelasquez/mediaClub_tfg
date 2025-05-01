<?php

use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;

//API USERS
Route::get('/users', [userController::class, 'index']);

Route::get('users/{id}', [userController::class,'show']);

Route::post('/users', [userController::class,'store']);

Route::put('users/{id}', [userController::class,'update']);

Route::patch('users/{id}', [userController::class,'updatePartial']);

Route::delete('users/{id}', [userController::class,'delete']);


//API TMDB
Route::get('/movies/popular',[MovieController::class,'popular']);