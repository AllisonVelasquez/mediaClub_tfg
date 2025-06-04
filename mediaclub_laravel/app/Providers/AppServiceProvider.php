<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\List\ListRepositoryInterface;
use App\Repositories\List\ListRepository;
use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Repositories\Friendship\FriendshipRepositoryInterface;
use App\Repositories\Review\ReviewRepositoryInterface;
use App\Repositories\Review\ReviewRepository;
use App\Exceptions\Handler;
use App\Repositories\FriendRequest\FriendRequestRepository;
use App\Repositories\Friendship\FriendshipRepository;
use Illuminate\Contracts\Debug\ExceptionHandler;
use App\Repositories\Rate\RateRepository;
use App\Repositories\Rate\RateRepositoryInterface;
use App\Observers\PuntuacionObserver;
use App\Models\Puntuacion;
use App\Repositories\Frame\FrameRepository;
use App\Repositories\Frame\FrameRepositoryInterface;
use App\Repositories\Actor\ActorRepository;
use App\Repositories\Actor\ActorRepositoryInterface;
use App\Repositories\Post\PostRepository;
use App\Repositories\Post\PostRepositoryInterface;
use App\Repositories\Activity\ActivityRepository;
use App\Repositories\Activity\ActivityRepositoryInterface;
use App\Repositories\Genre\GenreRepository;
use App\Repositories\Genre\GenreRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->singleton(ExceptionHandler::class, Handler::class);
        $this->app->bind(FriendRequestRepositoryInterface::class, FriendRequestRepository::class);
        $this->app->bind(FriendshipRepositoryInterface::class, FriendshipRepository::class);
        $this->app->bind(ListRepositoryInterface::class, ListRepository::class);
        $this->app->bind(ReviewRepositoryInterface::class, ReviewRepository::class);
        $this->app->bind(RateRepositoryInterface::class, RateRepository::class);
        $this->app->bind(FrameRepositoryInterface::class, FrameRepository::class);
        $this->app->bind(ActorRepositoryInterface::class, ActorRepository::class);
        $this->app->bind(PostRepositoryInterface::class, PostRepository::class);
        $this->app->bind(ActivityRepositoryInterface::class, ActivityRepository::class);
        $this->app->bind(GenreRepositoryInterface::class, GenreRepository::class);
    }

    public function boot()
    {
        Puntuacion::observe(PuntuacionObserver::class);
    }
}
