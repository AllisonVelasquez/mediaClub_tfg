<?php

namespace App\Repositories\Genre;

use App\Models\Genero;
use Illuminate\Database\Eloquent\Collection;

interface GenreRepositoryInterface
{
    public function addMovieGenre(int $tmdbid, string $nombre): Genero;
    public function addSerieGenre(int $tmdbid, string $nombre): Genero;
    public function getAll() : Collection;
    public function delete(int $tmdbid): bool;
}