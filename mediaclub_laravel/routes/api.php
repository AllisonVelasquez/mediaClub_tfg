<?php

use App\Http\Controllers\ActivityController;
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


//USERS

Route::prefix('auth')->group(function () {
    Route::post('/registro', [UserController::class, 'registerUser']); 
    Route::post('/login', [UserController::class, 'loginUser']); 
    Route::post('/logout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum'); 
});

Route::prefix('usuarios')->group(function () {
    Route::get('/buscar', [UserController::class, 'searchByAlias']); 

    Route::get('/{usuario}/perfil', [UserController::class, 'showProfile']); 
    Route::get('/{usuario}/listas-publicas', [ListController::class, 'showPublicUserLists']); 
    Route::get('/{usuario}/listas-publicas/{lista}', [ListController::class, 'showPublicUserListContent']); 
    Route::get('/{usuario}/amigos', [FriendShipController::class, 'showFriends']); 
    Route::get('/{usuario}/info', [UserController::class, 'showUserInfo']); 
    Route::get('/{usuario}/posts', [PostController::class, 'showUserPosts']); 
    Route::get('/{usuario}/posts/{post}', [PostController::class, 'showPost']); 

    Route::get('/{usuario}/actividad', [ActivityController::class, 'showUserActivity']);
});

Route::middleware('auth:sanctum')->prefix('mi')->group(function () {
    Route::get('/perfil', [UserController::class, 'myProfile']); 
    Route::patch('/actualizar-datos', [UserController::class, 'updateUser']); 
    Route::delete('/borrar-cuenta', [UserController::class, 'deleteUser']); 
    Route::get('/amigos', [FriendShipController::class, 'myFriends']); 
    Route::delete('/amigos/eliminar/{usuario}', [FriendShipController::class, 'removeFriend']); 

    Route::get('/actividad', [ActivityController::class, 'showMyActivity']);

    Route::prefix('posts')->group(function () {
        Route::get('/ver-todos', [PostController::class, 'showMyPosts']); 
        Route::get('/{post}/detalles', [PostController::class, 'showMyPost']);
        Route::post('/crear', [PostController::class, 'createPost']);
        Route::patch('/editar/{post}', [PostController::class, 'editPost']);
        Route::delete('/borrar/{post}', [PostController::class, 'deletePost']);
    });


    Route::prefix('amistad')->group(function () {
        Route::post('/solicitar/{usuario}', [FriendRequestController::class, 'sendFriendRequest']);
        Route::delete('/cancelar-solicitud/{usuario}', [FriendRequestController::class, 'cancelFriendRequest']); 
        Route::post('/aceptar-solicitud/{usuario}', [FriendRequestController::class, 'acceptFriendRequest']); 
        Route::post('/rechazar-solicitud/{usuario}', [FriendRequestController::class, 'rejectFriendRequest']); 
        Route::get('/solicitudes-recibidas', [FriendRequestController::class, 'getReceivedFriendRequests']); 
        Route::get('/solicitudes-enviadas', [FriendRequestController::class, 'getSentFriendRequests']); 
    });


    Route::prefix('listas')->group(function () {
        Route::get('/ver-todas', [ListController::class, 'myLists']); 
        Route::post('/crear', [ListController::class, 'createList']); 
        Route::patch('/editar/{lista}', [ListController::class, 'editList']); 
        Route::delete('/borrar/{lista}', [ListController::class, 'deleteList']); 
        Route::get('/{lista}/detalles', [ListController::class, 'showMyListContent']); 
        Route::post('/{lista}/anadir/{frame}', [ListController::class, 'addFrame']);  
        Route::delete('/{lista}/quitar/{frame}', [ListController::class, 'removeFrame']); 
    });

    Route::prefix('resenas')->group(function () {
        Route::get('/ver-todas', [ReviewController::class, 'getMyReviews']); 
        Route::get('/{resena}/detalles', [ReviewController::class, 'getReview']); 
        Route::delete('/{resena}/borrar', [ReviewController::class, 'deleteReview']); 
        Route::get('/{frame}', [ReviewController::class, 'getMyReviewsByFrame']); 
    });

    Route::prefix('puntuaciones')->group(function () { 
        Route::get('/ver-todas', [RateController::class, 'getMyRates']); 
        Route::patch('/editar/{puntuacion}', [RateController::class, 'editRate']); 
        Route::delete('/borrar/{puntuacion}', [RateController::class, 'deleteRate']); 
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

    Route::get('/{frame}/detalles', [FrameController::class, 'showFrameDetails']);
    Route::get('/{frame}/resenas', [FrameController::class, 'getReviews']); 

    Route::post('{frame}/anadir-resena', [ReviewController::class, 'addReview'])->middleware('auth:sanctum'); 
    Route::post('{frame}/anadir-puntuacion', [RateController::class, 'addRate'])->middleware('auth:sanctum'); 

    Route::get('/{frame}/listas-publicas', [ListController::class, 'showPublicListsByFrame']); 
    Route::get('/{frame}/similar', [FrameController::class, 'similar']); 
});

Route::prefix('actores')->group(function () {
    Route::get('/ver-todos', [ActorController::class, 'getAll']);
    Route::get('/buscar', [ActorController::class, 'searchByName']);
    Route::get('{actor}/detalles', [ActorController::class, 'showActor']); 
    Route::get('{actor}/filmografia', [ActorController::class, 'getFilmography']);
});


Route::get('{likeable_type}/{likeable_id}/ver-likes', [LikeController::class, 'showLikes']);
                                               
Route::middleware('auth:sanctum')->prefix('{likeable_type}/{likeable_id}')->group(function () {
    Route::get('/ver-likes', [LikeController::class, 'showLikes']);
    Route::post('/anadir-like', [LikeController::class, 'addLike']);
    Route::delete('/quitar-like', [LikeController::class, 'removeLike']);
});
