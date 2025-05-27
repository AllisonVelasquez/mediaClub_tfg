<?php

namespace App\Repositories\Genre;

use App\Models\Genero;
use Illuminate\Database\Eloquent\Collection;

class GenreRepository implements GenreRepositoryInterface
{
    public function add(int $tmdbid, string $nombre): Genero
    {
        return Genero::updateOrCreate(
            ['tmdb_id' => $tmdbid],
            ['nombre' => $nombre]
        );
    }

    public function getAll() : Collection
    {
        return Genero::paginate(15);
    }
    public function delete(int $tmdbid): bool
    {
        return Genero::findOrFail($tmdbid)->delete();
    }
}
