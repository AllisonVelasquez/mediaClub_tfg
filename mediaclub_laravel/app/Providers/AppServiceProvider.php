<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Exceptions\Handler;
use Illuminate\Contracts\Debug\ExceptionHandler;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
          // Bind del repositorio (como ya lo tienes)
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);

        // Bind del ExceptionHandler (esto es lo que te falta)
        $this->app->singleton(ExceptionHandler::class, Handler::class);
    }

    public function boot()
    {
        //
    }
}
