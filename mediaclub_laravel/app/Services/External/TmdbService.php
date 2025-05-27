<?php
namespace App\Services\External;

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
            throw new \Exception("Error al obtener película desde TMDB");
        }

        return $response->json();
    }
    public function getGenres(){

        $response = Http::get("{$this->baseUrl}/genre/movie/list", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES', 
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener los generos");

        }
        return $response->json('genres', []);
    }
}
