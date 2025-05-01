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

    protected function request(array $params): array
    {
        $response = Http::get($this->baseUrl, array_merge([
            'apikey' => $this->apiKey,
        ], $params));

        return $response->json();
    }

    public function getRateMovie(): array
    {
        return $this->request([
            't' => 'The Shawshank Redemption',
            'plot' => 'full',
        ]);
    }
}
