<?php

namespace App\Repositories\Genre;

use App\Models\Genero;
use Illuminate\Database\Eloquent\Collection;

class GenreRepository implements GenreRepositoryInterface
{
    public function addMovieGenre(int $tmdbid, string $nombre): Genero
    {
        return Genero::updateOrCreate(
            ['genero_id' => $tmdbid],
            [
                'nombre' => $nombre,
                'tipo_contenido' => 'pelicula'
            ]
        );
    }

    public function addSerieGenre(int $tmdbid, string $nombre): Genero
    {
        return Genero::updateOrCreate(
            ['genero_id' => $tmdbid],
            [
                'nombre' => $nombre,
                'tipo_contenido' => 'serie'
            ]
        );
    }
    public function getAll(): Collection
    {
        return Genero::paginate(15);
    }
    public function delete(int $tmdbid): bool
    {
        return Genero::findOrFail($tmdbid)->delete();
    }
}
