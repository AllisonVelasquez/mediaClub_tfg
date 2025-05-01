<?php

namespace App\Http\Controllers;

use App\Services\Apis\OmdbService;
use Exception;
use App\Traits\ApiResponse;


class OmdbController extends Controller
{
    use ApiResponse;

    protected $omdb;

    public function __construct(OmdbService $omdb)
    {
        $this->omdb = $omdb;
    }

    public function getRate()
    {
        // try {
        //     $movies = $this->omdb->getRateMovie()["results"];

        //     return $this->success($movies,'Lista Populares cargada');
        // } catch (Exception $e) {
        //     return $this->error();

        // }
    }
    //aqui nos quedamos, toca hacer mas gets
}
