<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class FetchTmdbMoviesByTypeAndPage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public string $type, public int $page) {}

    public function handle(): void
    {
        sleep(1); 

        $response = Http::get("https://api.themoviedb.org/3/movie/{$this->type}", [
            'api_key' => config('services.tmdb.api_key'),
            'page' => $this->page,
        ]);

        if ($response->successful() && isset($response['results'])) {
            foreach ($response['results'] as $data) {
                ImportMovieFromTMDB::dispatch($data['id']);
            }
        }
    }
}


