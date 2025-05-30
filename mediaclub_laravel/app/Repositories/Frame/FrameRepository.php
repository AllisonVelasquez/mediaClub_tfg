<?php

namespace App\Repositories\Frame;

use App\Models\Frame;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class FrameRepository implements FrameRepositoryInterface
{
    public function searchByTitle(string $title): LengthAwarePaginator
    {
        $title = trim($title);

        return Frame::searchData()
            ->where('title', 'like', "%{$title}%")
            ->paginate(15);
    }

    public function getDetails(int $id): Frame
    {
        return Frame::with(['actores', 'generos'])
            ->find($id);
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

        // if (isset($filters['actor_id'])) {
        //     $query->whereHas(
        //         'actores',
        //         fn($q) =>
        //         $q->where('actores.id', $filters['actor_id'])
        //     );
        // }

        if (isset($filters['fecha_estreno'])) {
            $query->whereYear('fecha_estreno', $filters['fecha_estreno']);
        }

        if (isset($filters['duracion'])) {
            $query->orderBy('duracion', $filters['duracion'] === 'desc' ? 'asc' : 'desc');
        }

        if (isset($filters['prpmedio_votos_tmdb'])) {
            $direction = strtolower($filters['promedio_votos_tmdb'] === 'desc' ? 'asc' : 'desc');
            $query->orderBy('promedio_votos_tmdb', $direction);
        }

        if (isset($filters['promedio_votos_muvis'])) {
            $direction = strtolower($filters['promedio_votos_muvis'] === 'desc' ? 'asc' : 'desc');
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

        if (empty($genreIds)) throw new Exception('No hay peliculas similares',404);

        return Frame::categoriesData()
            ->whereHas('generos', function ($query) use ($genreIds) {
                $query->whereIn('generos.id', $genreIds);
            })
            ->where('id', '!=', $id)
            ->limit(15)
            ->get();
    }

    public function updateMuvisAverageRate(int $frameId, array $avgRates): bool
    {
        return Frame::where('id', $frameId)->update([
            'promedio_votos_muvis' => $avgRates['average'] ?? 0,
            'cantidad_votos_muvis' => $avgRates['votes'] ?? 0,
        ]);
    }

    // public function updateMuvisAverageRate(int $frameId, array $avgRates): bool
    // {
    //     return Frame::where('id', $frameId)->update([
    //         'promedio_votos_muvis' => $avgRates['average'] ?? 0,
    //         'cantidad_votos_muvis' => $avgRates['votes'] ?? 0,
    //     ]);
    // }
}
