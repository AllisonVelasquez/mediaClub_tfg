<?php

namespace App\Services\External;

use Exception;
use Illuminate\Support\Facades\Http;

class TmdbService
{
    protected string $baseUrl;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.tmdb.base_url');
        $this->apiKey = config('services.tmdb.api_key');
    }

    public function getMovieGenres()
    {

        $response = Http::get("{$this->baseUrl}/genre/movie/list", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener los generos " . $response->body());
        }
        return $response->json('genres', []);
    }
    public function getSerieGenres()
    {

        $response = Http::get("{$this->baseUrl}/genre/tv/list", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener los generos " . $response->body());
        }
        return $response->json('genres', []);
    }

    public function getMovies(int $page = 1)
    {
        $response = Http::get("{$this->baseUrl}/movie/popular", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
            'page' => $page,
        ]);

        if (!$response->successful()) {
            throw new Exception('Error al obtener las peliculas' . $response->body());
        }
        return $response->json('results', []);
    }

    public function getSeries(int $page = 1)
    {
        $response = Http::get("{$this->baseUrl}/tv/popular", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
            'page' => $page,
        ]);

        if (!$response->successful()) {
            throw new Exception('Error al obtener las series ' . $response->body());
        }
        return $response->json('results', []);
    }

    public function getMovieCredits(int $frameId)
    {
        $response = Http::get("{$this->baseUrl}/movie/{$frameId}/credits", [
            'api_key' => $this->apiKey,
        ]);

        if (!$response->successful()) {
            throw new Exception('Error al obtener los actores ' . $response->body());
        }

        return $response->json('cast', []);
    }

    public function getDetails($mediaType = 'movie', $id)
    {
        $response = Http::get("{$this->baseUrl}/{$mediaType}/{$id}", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener los detalles " . $response->status());
        }
        return $response->json();
    }


    public function getTopRated(int $page = 1)
    {
        $response = Http::get("{$this->baseUrl}/movie/top_rated", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
            'page' => $page,
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener las peliculas mas puntuadas " . $response->status());
        }
        return $response->json('results');
    }

    public function getUpcoming(int $page = 1)
    {
        $response = Http::get("{$this->baseUrl}/movie/upcoming", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
            'page' => $page,
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener los estrenos  " . $response->status());
        }
        return $response->json('results');
    }

    public function getTrending($mediaType = 'movie', $timeWindow = 'week')
    {
        $response = Http::get("{$this->baseUrl}/trending/{$mediaType}/{$timeWindow}", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener trending " . $response->status());
        }
        return $response->json('results');
    }

    public function getSimilar($mediaType = 'movie', $id, $page = 1)
    {
        $response = Http::get("{$this->baseUrl}/{$mediaType}/{$id}/similar", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
            'page' => $page,
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener similares  " . $response->status());
        }
        return $response->json('results');
    }
}
