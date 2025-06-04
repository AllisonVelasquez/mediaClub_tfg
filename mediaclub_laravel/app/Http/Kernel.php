<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middlewareGroups = [
         'api' => [
        \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class, // Si usas Sanctum
        'throttle:api',  // Este middleware aplica la limitación de tasa de las solicitudes (API Rate Limiting)
        \Illuminate\Routing\Middleware\SubstituteBindings::class,  // Sustituye las rutas con los parámetros que defines
    ],
    ];
    
}