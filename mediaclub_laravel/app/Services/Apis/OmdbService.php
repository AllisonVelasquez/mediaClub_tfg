<?php
namespace App\Services\Apis;

use Illuminate\Support\Facades\Http;

class OmdbService
{
    protected $baseUrl;
    protected $apiKey;

    public function __construct()
    {
        $this->baseUrl = config('services.omdb.base_url');
        $this->apiKey = config('services.omdb.api_key');
    }

    public function getRateMovie(): array
    {
        $response = Http::get("{$this->baseUrl}/movie/popular", [
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ]);
        return $response->json();
    }
}
