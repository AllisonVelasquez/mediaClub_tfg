<?php

namespace Database\Seeders;

use App\Repositories\Genre\GenreRepository;
use App\Services\External\TmdbService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tmdb = app(TmdbService::class);
        $genres = $tmdb->getGenres();

        foreach ($genres as $genreData) {
            app(GenreRepository::class)->add($genreData['tmdb_id'],$genreData['name']);
        }
    }
}
