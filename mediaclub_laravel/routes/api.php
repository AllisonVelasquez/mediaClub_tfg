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
    Route::get('/alias/{alias}', [UserController::class, 'showProfile']);
    Route::get('/alias/{alias}/listas-publicas', [UserController::class, 'showLists']);
    Route::get('/alias/{alias}/amigos', [UserController::class, 'showFriends']);
    Route::get('/alias/{alias}/actividad', [UserController::class, 'activity']);
});

Route::middleware('auth:sanctum')->prefix('me')->group(function () {
    Route::get('/', [UserController::class, 'myProfile']);
    Route::put('/actualizar-datos', [UserController::class, 'updateProfile']);
    Route::delete('/borrar-cuenta', [UserController::class, 'deleteUser']);
    Route::get('/amigos', [UserController::class, 'myFriends']);
    Route::get('/actividad', [UserController::class, 'myActivity']);

    // Agrupar bajo autenticación
    Route::prefix('amistad')->group(function () {
        Route::post('/solicitar/{id}', [FriendshipController::class, 'sendRequest']);
        Route::delete('/cancelar-solicitud/{id}', [FriendshipController::class, 'cancelRequest']);
        Route::post('/aceptar/{id}', [FriendshipController::class, 'acceptRequest']);
        Route::post('/rechazar/{id}', [FriendshipController::class, 'rejectRequest']);
        Route::get('/solicitudes', [FriendshipController::class, 'viewRequests']);
        Route::get('/enviadas', [FriendshipController::class, 'viewSentRequests']);
        Route::delete('/amigos/{id}', [UserController::class, 'removeFriend']);
    });


    Route::prefix('listas')->group(function () {
        Route::get('/', [ListController::class, 'myLists']);
        Route::get('/{id}', [ListController::class, 'showList']);
        Route::post('/', [ListController::class, 'addList']);
        Route::put('/{id}', [ListController::class, 'editList']);
        Route::delete('/{id}', [ListController::class, 'deleteList']);
        Route::post('/{id}/agregar', [ListController::class, 'addContent']);
        Route::delete('/{id}/quitar/{contenidoId}', [ListController::class, 'removeContent']);
    });

    Route::prefix('resenas')->group(function () {
        Route::get('/', [ResenaController::class, 'getReviews']);
        Route::post('/', [ResenaController::class, 'addReview']);
        Route::get('/{id}', [ResenaController::class, 'showReview']);
        Route::delete('/{id}', [ResenaController::class, 'deleteReview']);
        Route::get('/frame/{id}', [ResenaController::class, 'showFrameReview']);
    });

    Route::prefix('puntuaciones')->group(function () {
        Route::get('/', [PuntuacionController::class, 'getRating']);
        Route::post('/', [PuntuacionController::class, 'addRating']);
        Route::put('/{id}', [PuntuacionController::class, 'editRating']);
        Route::delete('/{id}', [PuntuacionController::class, 'deleteRating']);
        Route::get('/frame/{id}', [PuntuacionController::class, 'showFrameRating']);
    });
});


// Contenido cambiar controllers
Route::prefix('frames')->group(function () {
    Route::get('/peliculas', [TmdbController::class, 'getMovies']);
    Route::get('/series', [TmdbController::class, 'getSeries']);
    Route::get('/buscar/{titulo}', [FrameController::class, 'search']);
    Route::get('/popular', [TmdbController::class, 'popular']);
    Route::get('/mas-puntuados', [TmdbController::class, 'topRated']);
    Route::get('/proximamente', [TmdbController::class, 'upcoming']);
    Route::get('/tendencia', [TmdbController::class, 'trending']);
    Route::get('/{id}/similar', [TmdbController::class, 'similarMovies']);
    Route::get('/{id}', [FrameController::class, 'show']); //Va a mostrar todo

    // Route::post('/sincronizar/{id}', [FrameController::class, 'sincronizar']);
});

// Géneros
Route::get('/generos', [GeneroController::class, 'index']);
