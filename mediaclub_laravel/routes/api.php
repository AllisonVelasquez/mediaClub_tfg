<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\FrameController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\FriendShipController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RateController;


// Route::get('/test-db-cache', function () {
//     Cache::put('cache_prueba', 'Laravel usando cache en la DB!', now()->addHours(24));
//     $mensaje = Cache::get('cache_prueba');
//     return response()->json(['mensaje' => $mensaje]);
// });

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
        Route::get('/ver-todas', [ReviewController::class, 'getMyReviews']); //
        Route::get('/{resena:resena_id}/ver', [ReviewController::class, 'getReview']); //
        Route::delete('/{resena:resena_id}/borrar', [ReviewController::class, 'deleteReview']); //
        Route::get('/{frame:frame_id}', [ReviewController::class, 'getMyReviewsByFrame']); //
    });

    Route::prefix('puntuaciones')->group(function () { //
        Route::get('/ver-todas', [RateController::class, 'getMyRates']); //
        Route::patch('/editar/{puntuacion:puntuacion_id}', [RateController::class, 'editRate']); //
        Route::delete('/borrar/{puntuacion:puntuacion_id}', [RateController::class, 'deleteRate']); //
    });
});

//FRAMES

Route::prefix('frames')->group(function () {
    Route::get('/buscar/{titulo}', [FrameController::class, 'searchByTitle']);

    // Route::get('/peliculas', [FrameController::class, 'getMovies']);
    // Route::get('/series', [FrameController::class, 'getSeries']);
    Route::get('/popular', [FrameController::class, 'popular']);
    Route::get('/mas-puntuados', [FrameController::class, 'topRated']);
    Route::get('/proximamente', [FrameController::class, 'upcoming']);
    Route::get('/tendencia', [FrameController::class, 'trending']);

    Route::get('/{frame:frame_id}', [FrameController::class, 'showFrameDetails']);

    Route::get('/{frame:frame_id}/resenas', [ReviewController::class, 'getReviewsByFrame']); //
    Route::post('{frame:frame_id}/anadir-resena', [ReviewController::class, 'addReview'])->middleware('auth:sanctum'); //
    Route::get('/{frame:frame_id}/puntuacion', [RateController::class, 'getRateAverage']);
    Route::post('{frame:frame_id}/anadir-puntuacion', [RateController::class, 'addRate'])->middleware('auth:sanctum');

    Route::get('/{frame:frame_id}/listas', [ListController::class, 'getListas']); //List controller para buscar publicas donde este el frame FALTA
    Route::get('/{frame:frame_id}/similar', [FrameController::class, 'similar']); 

    Route::get('/generos', [FrameController::class, 'getAllGenres']);
});


