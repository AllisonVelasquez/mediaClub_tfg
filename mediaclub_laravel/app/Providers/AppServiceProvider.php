<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\List\ListRepositoryInterface;
use App\Repositories\List\ListRepository;
use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Repositories\Friendship\FriendshipRepositoryInterface;

use App\Exceptions\Handler;
use App\Repositories\FriendRequest\FriendRequestRepository;
use App\Repositories\Friendship\FriendshipRepository;
use Illuminate\Contracts\Debug\ExceptionHandler;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->singleton(ExceptionHandler::class, Handler::class);
        $this->app->bind(FriendRequestRepositoryInterface::class, FriendRequestRepository::class);
        $this->app->bind(FriendshipRepositoryInterface::class, FriendshipRepository::class);
        $this->app->bind(ListRepositoryInterface::class, ListRepository::class);

    }

    public function boot()
    {
        //
    }
}
