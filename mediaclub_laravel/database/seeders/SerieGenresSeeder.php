<?php

namespace Database\Seeders;

use App\Repositories\Genre\GenreRepository;
use App\Services\External\TmdbService;
use Illuminate\Database\Seeder;

class SerieGenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tmdb = app(TmdbService::class);
        $genres = $tmdb->getSerieGenres();

        foreach ($genres as $genreData) {
            app(GenreRepository::class)->addSerieGenre($genreData['id'],$genreData['name']);
        }
    }
}
