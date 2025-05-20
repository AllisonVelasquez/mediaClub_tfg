<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\FrameController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\ResenaController;
use App\Http\Controllers\PuntuacionController;

//USERS

Route::prefix('auth')->group(function () {
    Route::post('/registro', [UserController::class, 'registerUser']); //
    Route::post('/login', [UserController::class, 'loginUser']); //
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum'); //
});

Route::prefix('usuarios')->group(function () {
    Route::get('/{alias}/perfil', [UserController::class, 'showProfile']); //
    Route::get('/{alias}/listas-publicas', [UserController::class, 'showLists']); //ListController
    Route::get('/{alias}/listas-publicas/{nombre}', [UserController::class, 'showListContent']); //ListController
    Route::get('/{alias}/amigos', [UserController::class, 'showFriends']); //friendship controller
    Route::get('/{alias}/actividad', [UserController::class, 'activity']);
});

Route::middleware('auth:sanctum')->prefix('me')->group(function () {
    Route::get('/perfil', [UserController::class, 'myProfile']); //
    Route::patch('/actualizar-datos', [UserController::class, 'updateUser']); //
    Route::delete('/borrar-cuenta', [UserController::class, 'deleteUser']); //
    Route::get('/amigos', [UserController::class, 'myFriends']); //friendship controller
    Route::delete('/amigos/eliminar/{alias}', [UserController::class, 'removeFriend']); //Friendship controller
    Route::get('/actividad', [UserController::class, 'myActivity']);

    // Agrupar bajo autenticación
    Route::prefix('amistad')->group(function () {
        Route::post('/solicitar/{alias}', [FriendRequestController::class, 'sendFriendRequest']); //
        Route::delete('/cancelar-solicitud/{alias}', [FriendRequestController::class, 'cancelFriendRequest']); //
        Route::post('/aceptar-solicitud/{alias}', [FriendRequestController::class, 'acceptFriendRequest']); //
        Route::post('/rechazar-solicitud/{alias}', [FriendRequestController::class, 'rejectFriendRequest']); //
        Route::get('/solicitudes-recibidas', [FriendRequestController::class, 'getReceivedFriendRequests']); //
        Route::get('/solicitudes-enviadas', [FriendRequestController::class, 'getSentFriendRequests']); //
    });


    Route::prefix('listas')->group(function () {
        Route::get('/ver-todas', [ListController::class, 'myLists']);
        Route::post('/crear', [ListController::class, 'addList']);
        Route::patch('/editar/{id}', [ListController::class, 'editList']);
        Route::delete('/borrar/{id}', [ListController::class, 'deleteList']);
        Route::get('/{id}/detalles', [ListController::class, 'showList']);
        Route::post('/{id}/anadir/{frameid}', [ListController::class, 'addContent']);
        Route::delete('/{id}/quitar/{frameid}', [ListController::class, 'removeContent']);
    });

    Route::prefix('resenas')->group(function () {
        Route::get('/ver-todas', [ResenaController::class, 'getReviews']);
        Route::post('/crear', [ResenaController::class, 'addReview']);
        Route::delete('/borrar/{frameid}', [ResenaController::class, 'deleteReview']);
        Route::get('/titulo/{Frameid}', [ResenaController::class, 'showFrameReview']);
    });

    Route::prefix('puntuaciones')->group(function () {
        Route::get('/ver-todas', [PuntuacionController::class, 'getRating']);
        Route::post('/crear', [PuntuacionController::class, 'addRating']);
        Route::patch('/editar/{id}', [PuntuacionController::class, 'editRating']);
        Route::delete('/borrar/{id}', [PuntuacionController::class, 'deleteRating']);
        Route::get('/titulo/{Frameid}', [PuntuacionController::class, 'showFrameRating']);
    });
});


// Contenido cambiar controllers
Route::prefix('frames')->group(function () {
    Route::get('/buscar/{titulo}', [FrameController::class, 'searchByTitle']);
    Route::get('/peliculas', [TmdbController::class, 'getMovies']);
    Route::get('/series', [TmdbController::class, 'getSeries']);
    Route::get('/popular', [TmdbController::class, 'popular']);
    Route::get('/mas-puntuados', [TmdbController::class, 'topRated']);
    Route::get('/proximamente', [TmdbController::class, 'upcoming']);
    Route::get('/tendencia', [TmdbController::class, 'trending']);
    Route::get('/{id}', [FrameController::class, 'show']);
    Route::get('/{id}/similar', [TmdbController::class, 'similarMovies']); //Va a mostrar todo TODO
    // Route::post('/sincronizar/{id}', [FrameController::class, 'sincronizar']);
});

// Géneros
Route::get('/generos', [GeneroController::class, 'index']);
