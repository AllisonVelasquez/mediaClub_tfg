<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\FrameController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\FriendShipController;
use App\Http\Controllers\ResenaController;
use App\Http\Controllers\PuntuacionController;

//USERS

Route::prefix('auth')->group(function () {
    Route::post('/registro', [UserController::class, 'registerUser']); //
    Route::post('/login', [UserController::class, 'loginUser']); //
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum'); //
});

Route::prefix('usuarios')->group(function () {
    Route::get('/{usuario:alias}/perfil', [UserController::class, 'showProfile']); //
    Route::get('/{usuario:alias}/listas-publicas', [ListController::class, 'showPublicUserLists']); //
    Route::get('/{usuario:alias}/listas-publicas/{id}', [ListController::class, 'showPublicUserListContent']); //
    Route::get('/{usuario:alias}/amigos', [FriendShipController::class, 'showFriends']); //

    Route::get('/{usuario:alias}/actividad', [UserController::class, 'activity']); 
});

Route::middleware('auth:sanctum')->prefix('me')->group(function () {
    Route::get('/perfil', [UserController::class, 'myProfile']); //
    Route::patch('/actualizar-datos', [UserController::class, 'updateUser']); //
    Route::delete('/borrar-cuenta', [UserController::class, 'deleteUser']); //
    Route::get('/amigos', [FriendShipController::class, 'myFriends']); //
    Route::delete('/amigos/eliminar/{usuario:alias}', [FriendShipController::class, 'removeFriend']); //

    Route::get('/actividad', [UserController::class, 'myActivity']); 

    // Agrupar bajo autenticación
    Route::prefix('amistad')->group(function () {
        Route::post('/solicitar/{usuario:alias}', [FriendRequestController::class, 'sendFriendRequest']); //
        Route::delete('/cancelar-solicitud/{usuario:alias}', [FriendRequestController::class, 'cancelFriendRequest']); //
        Route::post('/aceptar-solicitud/{usuario:alias}', [FriendRequestController::class, 'acceptFriendRequest']); //
        Route::post('/rechazar-solicitud/{usuario:alias}', [FriendRequestController::class, 'rejectFriendRequest']); //
        Route::get('/solicitudes-recibidas', [FriendRequestController::class, 'getReceivedFriendRequests']); //
        Route::get('/solicitudes-enviadas', [FriendRequestController::class, 'getSentFriendRequests']); //
    });


    Route::prefix('listas')->group(function () { 
        Route::get('/ver-todas', [ListController::class, 'myLists']); //
        Route::post('/crear', [ListController::class, 'createList']); //
        Route::patch('/editar/{lista:lista_id}', [ListController::class, 'editList']); //
        Route::delete('/borrar/{lista:lista_id}', [ListController::class, 'deleteList']); //
        Route::get('/{id}/detalles', [ListController::class, 'showMyListContent']); //
        Route::post('/{lista:lista_id}/anadir/{frame:frame_id}', [ListController::class, 'addFrame']);  //
        Route::delete('/{lista:lista_id}/quitar/{frame:frame_id}', [ListController::class, 'removeFrame']); //
    });

    Route::prefix('resenas')->group(function () {
        Route::get('/ver-todas', [ResenaController::class, 'getReviews']);
        Route::post('/crear', [ResenaController::class, 'addReview']);
        Route::delete('/borrar/{frame:frame_id}', [ResenaController::class, 'deleteReview']);
        Route::get('/{Frameid}', [ResenaController::class, 'showFrameReview']);
    });

    Route::prefix('puntuaciones')->group(function () {
        Route::get('/ver-todas', [PuntuacionController::class, 'getRating']);
        Route::post('/crear', [PuntuacionController::class, 'addRating']);
        Route::patch('/editar/{puntuacion:puntuacion_id}', [PuntuacionController::class, 'editRating']);
        Route::delete('/borrar/{puntuacion:puntuacion_id}', [PuntuacionController::class, 'deleteRating']);
        Route::get('/{Frameid}', [PuntuacionController::class, 'showFrameRating']);
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
