<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchAllTmdbMovies implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected array $categories = [
        'popular',
        'now_playing',
        'top_rated',
        'upcoming',
    ];

    protected int $maxPages;

    public function __construct(int $maxPages = 500)
    {
        $this->maxPages = min($maxPages, 500);
    }

    public function handle(): void
    {
        foreach ($this->categories as $type) {
            for ($page = 1; $page <= $this->maxPages; $page++) {
                FetchTmdbMoviesByTypeAndPage::dispatch($type, $page);
            }
        }
    }
}
