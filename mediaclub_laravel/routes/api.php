<?php

use App\Http\Controllers\ActivityController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ListController;
use App\Http\Controllers\FrameController;
use App\Http\Controllers\FriendRequestController;
use App\Http\Controllers\FriendShipController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;

// Route::get('/test-db-cache', function () {
//     Cache::put('cache_prueba', 'Laravel usando cache en la DB!', now()->addHours(24));
//     $mensaje = Cache::get('cache_prueba');
//     return response()->json(['mensaje' => $mensaje]);
// });

//USERS

Route::prefix('auth')->group(function () {
    Route::post('/registro', [UserController::class, 'registerUser']); 
    Route::post('/login', [UserController::class, 'loginUser']); 
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum'); 
});

Route::prefix('usuarios')->group(function () {
    Route::get('/buscar', [UserController::class, 'searchByAlias']); 

    Route::get('/{usuario:id}/perfil', [UserController::class, 'showProfile']); 
    Route::get('/{usuario:id}/listas-publicas', [ListController::class, 'showPublicUserLists']); 
    Route::get('/{usuario:id}/listas-publicas/{lista:id}', [ListController::class, 'showPublicUserListContent']); 
    Route::get('/{usuario:id}/amigos', [FriendShipController::class, 'showFriends']); 
    Route::get('/{usuario:id}/info', [FriendShipController::class, 'showUserInfo']);
    Route::get('/{usuario:id}/posts', [PostController::class, 'showUserPosts']); 
    Route::get('/{usuario:id}/posts/{post:id}', [PostController::class, 'showPost']); 

    Route::get('/{usuario:id}/actividad', [ActivityController::class, 'showUserActivity']);
});

Route::middleware('auth:sanctum')->prefix('mi')->group(function () {
    Route::get('/perfil', [UserController::class, 'myProfile']); 
    Route::patch('/actualizar-datos', [UserController::class, 'updateUser']); 
    Route::delete('/borrar-cuenta', [UserController::class, 'deleteUser']); 
    Route::get('/amigos', [FriendShipController::class, 'myFriends']); 
    Route::delete('/amigos/eliminar/{usuario:alias}', [FriendShipController::class, 'removeFriend']); 

    Route::get('/actividad', [ActivityController::class, 'showMyActivity']);

    Route::prefix('posts')->group(function () {
        Route::get('/ver-todos', [PostController::class, 'showMyPosts']); 
        Route::get('/{post:id}/detalles', [PostController::class, 'showPost']); 
        Route::post('/crear', [PostController::class, 'createPost']);
        Route::patch('/editar/{post:id}', [PostController::class, 'editPost']);
        Route::delete('/borrar/{post:id}', [PostController::class, 'deletePost']);
    });


    Route::prefix('amistad')->group(function () {
        Route::post('/solicitar/{usuario:alias}', [FriendRequestController::class, 'sendFriendRequest']);
        Route::delete('/cancelar-solicitud/{usuario:alias}', [FriendRequestController::class, 'cancelFriendRequest']); 
        Route::post('/aceptar-solicitud/{usuario:alias}', [FriendRequestController::class, 'acceptFriendRequest']); 
        Route::post('/rechazar-solicitud/{usuario:alias}', [FriendRequestController::class, 'rejectFriendRequest']); 
        Route::get('/solicitudes-recibidas', [FriendRequestController::class, 'getReceivedFriendRequests']); 
        Route::get('/solicitudes-enviadas', [FriendRequestController::class, 'getSentFriendRequests']); 
    });


    Route::prefix('listas')->group(function () {
        Route::get('/ver-todas', [ListController::class, 'myLists']); 
        Route::post('/crear', [ListController::class, 'createList']); 
        Route::patch('/editar/{lista:id}', [ListController::class, 'editList']); 
        Route::delete('/borrar/{lista:id}', [ListController::class, 'deleteList']); 
        Route::get('/{lista:id}/detalles', [ListController::class, 'showMyListContent']); 
        Route::post('/{lista:id}/anadir/{frame:id}', [ListController::class, 'addFrame']);  
        Route::delete('/{lista:id}/quitar/{frame:id}', [ListController::class, 'removeFrame']); 
    });

    Route::prefix('resenas')->group(function () {
        Route::get('/ver-todas', [ReviewController::class, 'getMyReviews']); 
        Route::get('/{resena:id}/ver', [ReviewController::class, 'getReview']); 
        Route::delete('/{resena:id}/borrar', [ReviewController::class, 'deleteReview']); 
        Route::get('/{frame:id}', [ReviewController::class, 'getMyReviewsByFrame']); 
    });

    Route::prefix('puntuaciones')->group(function () { 
        Route::get('/ver-todas', [RateController::class, 'getMyRates']); 
        Route::patch('/editar/{puntuacion:id}', [RateController::class, 'editRate']); 
        Route::delete('/borrar/{puntuacion:id}', [RateController::class, 'deleteRate']); 
    });
});

//FRAMES

Route::prefix('frames')->group(function () {
    Route::get('/buscar', [FrameController::class, 'searchByTitle']); 
    Route::get('/filtrar', [FrameController::class, 'filterBy']); 
    Route::get('/generos', [FrameController::class, 'getAllGenres']); 
    Route::get('/popular', [FrameController::class, 'popular']); 
    Route::get('/top-10', [FrameController::class, 'top10']); 
    Route::get('/recientes', [FrameController::class, 'nowPlaying']);

    Route::get('/{frame:id}', [FrameController::class, 'showFrameDetails']);
    Route::get('/{frame:id}/resenas', [FrameController::class, 'getReviews']); 

    Route::post('{frame:id}/anadir-resena', [ReviewController::class, 'addReview'])->middleware('auth:sanctum'); 
    Route::post('{frame:id}/anadir-puntuacion', [RateController::class, 'addRate'])->middleware('auth:sanctum'); 

    Route::get('/{frame:id}/listas-publicas', [ListController::class, 'showPublicListsByFrame']); 
    Route::get('/{frame:id}/similar', [FrameController::class, 'similar']); 
});

Route::prefix('actores')->group(function () {
    Route::get('/', [ActorController::class, 'getAll']);
    Route::get('/buscar', [ActorController::class, 'searchByName']);
    Route::get('{actor:id}', [ActorController::class, 'showActor']);
    Route::get('{actor:id}/filmografia', [ActorController::class, 'getFilmography']);
});


Route::get('{likeable_type}/{likeable_id}/ver-likes', [LikeController::class, 'showLikes']);

Route::middleware('auth:sanctum')->prefix('{likeable_type}/{likeable_id}')->group(function () {
    Route::post('anadir', [LikeController::class, 'addLike']);
    Route::delete('quitar', [LikeController::class, 'removeLike']);
});
