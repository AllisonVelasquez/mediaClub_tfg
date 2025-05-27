<?php

namespace Database\Seeders;

use App\Repositories\Genre\GenreRepository;
use App\Services\External\TmdbService;
use Illuminate\Database\Seeder;

class MovieGenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tmdb = app(TmdbService::class);
        $genres = $tmdb->getMovieGenres();

        foreach ($genres as $genreData) {
            app(GenreRepository::class)->addMovieGenre($genreData['id'],$genreData['name']);
        }
    }
}
