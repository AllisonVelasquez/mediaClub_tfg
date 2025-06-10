<?php

namespace App\Repositories\Frame;

use App\Models\Frame;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class FrameRepository implements FrameRepositoryInterface
{
    public function searchByTitle(string $title): LengthAwarePaginator
    {
        $title = trim($title);

        return Frame::searchData()
            ->where('titulo', 'like', "%{$title}%")
            ->paginate(15);
    }

    public function getDetails(int $id): Frame
    {
        $cacheKey = "movie_with_relations_{$id}";

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $movie = Frame::with(['actores', 'generos'])
            ->find($id);

        Cache::put($cacheKey, $movie, 1800);

        return $movie;
    }

    public function filter(array $filters): LengthAwarePaginator
    {
        $query = Frame::categoriesData();

        if (isset($filters['genero_id'])) {
            $query->whereHas(
                'generos',
                fn($q) =>
                $q->where('generos.id', $filters['genero_id'])
            );
        }

        if (isset($filters['fecha_estreno'])) {
            $query->whereYear('fecha_estreno', $filters['fecha_estreno']);
        }

        if (isset($filters['duracion'])) {
            $query->orderBy('duracion', $filters['duracion']);
        }

        if (isset($filters['promedio_votos_tmdb'])) {
            $direction = strtolower($filters['promedio_votos_tmdb']);
            $query->orderBy('promedio_votos_tmdb', $direction);
        }

        if (isset($filters['promedio_votos_muvis'])) {
            $direction = strtolower($filters['promedio_votos_muvis']);
            $query->orderBy('promedio_votos_muvis', $direction);
        }

        return $query->paginate(15);
    }


    public function getPopular(): LengthAwarePaginator
    {
        return Frame::categoriesData()
            ->orderByDesc('popularidad')
            ->paginate(15);
    }


    public function getTop10(): Collection
    {
        return Frame::categoriesData()
            ->orderByDesc('promedio_votos_tmdb')
            ->limit(10)->get();
    }


    public function getNowPlaying(): LengthAwarePaginator
    {
        return Frame::categoriesData()
            ->whereDate('fecha_estreno', '<=', now())
            ->orderByDesc('fecha_estreno')
            ->paginate(15);
    }


    public function getSimilar(int $id): Collection
    {
        $genreIds =  DB::table('frame_genero')
            ->where('frame_id', $id)
            ->pluck('genero_id')
            ->toArray();

        if (empty($genreIds)) throw new Exception('No hay peliculas similares', 404);

        return Frame::categoriesData()
            ->whereHas('generos', function ($query) use ($genreIds) {
                $query->whereIn('genero.id', $genreIds);
            })
            ->where('id', '!=', $id)
            ->limit(15)
            ->get();
    }

    public function getReviews(int $frameId): LengthAwarePaginator
    {
        $frame = Frame::findOrFail($frameId);
        return $frame->resenas()
            ->with(['usuario:id,foto_perfil,alias'])
            ->orderBy('fecha', 'desc')
            ->paginate(10);
    }
}
