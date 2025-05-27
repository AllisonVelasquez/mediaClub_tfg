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

    public function getMovie(int $tmdbId): array
    {
        $response = Http::get("{$this->baseUrl}/movie/{$tmdbId}", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);

        if (!$response->successful()) {
            throw new \Exception("Error al obtener película desde TMDB");
        }

        return $response->json();
    }
}
