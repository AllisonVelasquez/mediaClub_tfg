<?php
namespace App\Services\Apis;

use Illuminate\Support\Facades\Http;

class TmdbService
{
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.tmdb.base_url');
        $this->apiKey = config('services.tmdb.api_key');
    }

    public function getPopularMovies(): array
    {
        $response = Http::get("{$this->baseUrl}/movie/popular", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);
        return $response->json();
    }
}
