<?php

use App\Http\Controllers\TmdbController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\FrameController;
use App\Http\Controllers\GeneroController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\ResenaController;
use App\Http\Controllers\PuntuacionController;

//USERS

Route::prefix('auth')->group(function () {
    Route::post('/registro', [UserController::class, 'registerUser']);
    Route::post('/login', [UserController::class, 'loginUser']);
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum');
});

Route::prefix('usuarios')->group(function () {
    Route::get('/alias/{alias}', [UserController::class, 'getIdByAlias']);
    Route::get('/{id}/perfil', [UserController::class, 'showProfile']);
    Route::get('/{id}/listas-publicas', [UserController::class, 'showLists']);
    Route::get('/{id}/amigos', [UserController::class, 'showFriends']);
    Route::get('/{id}/actividad', [UserController::class, 'activity']);
});

Route::middleware('auth:sanctum')->prefix('me')->group(function () {
    Route::get('/perfil', [UserController::class, 'myProfile']);
    Route::put('/actualizar-datos', [UserController::class, 'updateProfile']);
    Route::delete('/borrar-cuenta', [UserController::class, 'deleteUser']);
    Route::get('/amigos', [UserController::class, 'myFriends']);
    Route::delete('/amigos/eliminar/{id}', [UserController::class, 'removeFriend']);
    Route::get('/actividad', [UserController::class, 'myActivity']);

    // Agrupar bajo autenticación
    Route::prefix('amistad')->group(function () {
        Route::post('/solicitar/{id}', [FriendshipController::class, 'sendRequest']);
        Route::delete('/cancelar-solicitud/{id}', [FriendshipController::class, 'cancelRequest']);
        Route::post('/aceptar-solicitud/{id}', [FriendshipController::class, 'acceptRequest']);
        Route::post('/rechazar-solicitud/{id}', [FriendshipController::class, 'rejectRequest']);
        Route::get('/solicitudes-recibidas', [FriendshipController::class, 'viewRequests']);
        Route::get('/solicitudes-enviadas', [FriendshipController::class, 'viewSentRequests']);
    });


    Route::prefix('listas')->group(function () {
        Route::get('/ver-todas', [ListController::class, 'myLists']);
        Route::post('/crear', [ListController::class, 'addList']);
        Route::put('/editar/{id}', [ListController::class, 'editList']);
        Route::delete('/borrar/{id}', [ListController::class, 'deleteList']);
        Route::get('/{id}/detalles', [ListController::class, 'showList']);
        Route::post('/{id}/anadir/{frameid}', [ListController::class, 'addContent']);
        Route::delete('/{id}/quitar/{frameid}', [ListController::class, 'removeContent']);
    });

    Route::prefix('resenas')->group(function () {
        Route::get('/ver-todas', [ResenaController::class, 'getReviews']);
        Route::post('/crear', [ResenaController::class, 'addReview']);
        Route::delete('/borrar/{id}', [ResenaController::class, 'deleteReview']);
        Route::get('/titulo/{Frameid}', [ResenaController::class, 'showFrameReview']);
    });

    Route::prefix('puntuaciones')->group(function () {
        Route::get('/ver-todas', [PuntuacionController::class, 'getRating']);
        Route::post('/crear', [PuntuacionController::class, 'addRating']);
        Route::put('/editar/{id}', [PuntuacionController::class, 'editRating']);
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
