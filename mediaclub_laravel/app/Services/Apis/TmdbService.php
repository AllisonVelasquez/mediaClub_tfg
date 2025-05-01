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

    protected function request(string $endpoint, array $params = []): array
    {
        $response = Http::get($this->baseUrl . $endpoint, array_merge([
            'api_key' => $this->apiKey,
            'language' => 'es-ES',
        ], $params));

        return $response->json();
    }

    //Listas de peliculas


    public function getNowPlayingMovies(): array
    {
        return $this->request('movie/now_playing');
    }

    public function getUpcomingMovies(): array
    {
        return $this->request('movie/upcoming');
    }

    public function getTopRatedMovies(): array
    {
        return $this->request('movie/top_rated');
    }

    public function getPopularMovies(): array
    {
        return $this->request('movie/popular');
    }
    public function getLatestMovies(): array
    {
        return $this->request('movie/latest');
    }
    public function getMovieGenres(): array
    {
        return $this->request('genre/movie/list');
    }
    


    //Detalles de peliculas
    public function getMovieByTitle(string $title): array
    {
        return $this->request('/search/movie', [
            'query' => $title
        ]);
    }



    public function getMovieDetails(string $id): array
    {
        return $this->request('movie/' . $id, [
            'append_to_response' => 'credits',
        ]);
    }

    //Listas de series
    public function getAiringTodayTvShows(): array
    {
        return $this->request('tv/airing_today');
    }

    public function getOnTheAirTvShows(): array
    {
        return $this->request('tv/on_the_air');
    }
    public function getTopRatedTvShows(): array
    {
        return $this->request('tv/top_rated');
    }
    public function getPopularTvShows(): array
    {
        return $this->request('tv/popular');
    }

    //Detalles de series
    public function getTvShowDetails(string $id): array
    {
        return $this->request('tv/' . $id, [
            'append_to_response' => 'credits',
        ]);
    }
    public function getTvShowByTitle(string $title): array
    {
        return $this->request('/search/tv', [
            'query' => $title
        ]);
    }
}
