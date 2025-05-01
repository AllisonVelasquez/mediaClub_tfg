<?php

namespace App\Http\Controllers;

use App\Integrations\Tmdb\TmdbService;
use Exception;
use App\Traits\ApiResponse;


class MovieController extends Controller
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
}
