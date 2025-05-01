<?php

namespace App\Http\Controllers;

use App\Services\Apis\TmdbService;
use Exception;
use App\Traits\ApiResponse;


class TmdbController extends Controller
{
    use ApiResponse;

    protected $tmdb;

    public function __construct(TmdbService $tmdb)
    {
        $this->tmdb = $tmdb;
    }

    public function popular()
    {
        try {
            $movies = $this->tmdb->getPopularMovies()["results"];

            return $this->success($movies,'Lista Populares cargada');
        } catch (Exception $e) {
            return $this->error();

        }
    }
    //aqui nos quedamos, toca hacer mas gets
}
