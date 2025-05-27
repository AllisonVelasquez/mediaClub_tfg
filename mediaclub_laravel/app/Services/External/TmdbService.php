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

    public function getMovie(int $id): array
    {
        $response = Http::get("{$this->baseUrl}/movie/{$id}", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener película desde TMDB " . $response->body());
        }

        return $response->json();
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

    public function getPopular(int $page = 1)
    {
        $response = Http::get("{$this->baseUrl}/movie/popular", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
            'page' => $page,
        ]);

        if (!$response->successful()) {
            throw new Exception('Error al obtener los frames ' . $response->body());
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
}
