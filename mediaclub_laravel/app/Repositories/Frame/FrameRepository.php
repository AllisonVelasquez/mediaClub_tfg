<?php

namespace App\Repositories;


use App\Models\Frame;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FrameRepository
{
    public function searchByTitle(string $title): Collection
    {
        $title = trim($title);


        // if (strlen($title) > 100) {
        //     throw new \InvalidArgumentException('El título es demasiado largo.');
        // }
        $frames = Frame::where('title', 'like', "%{$title}%")->get();


        if ($frames->isEmpty()) {
            throw new ModelNotFoundException("No se encontró ningún Frame con el título: {$title}");
        }
        return $frames;
    }


    public function getDetails(int $id)
    {
        return Frame::with(['actores', 'generos'])
            ->find($id);
    }


    public function filter(array $filters): LengthAwarePaginator
    {
        $query = Frame::query();

        if (isset($filters['genero_id'])) {
            $query->whereHas(
                'generos',
                fn($q) =>
                $q->where('generos.id', $filters['genero_id'])
            );
        }

        if (isset($filters['actor_id'])) {
            $query->whereHas(
                'actores',
                fn($q) =>
                $q->where('actores.id', $filters['actor_id'])
            );
        }


        if (isset($filters['fecha_estreno'])) {
            $query->where('fecha_estreno', $filters['fecha_estreno']);
        }


        if (isset($filters['popularidad'])) {
            $query->orderBy('popularidad', $filters['popularidad'] === 'desc' ? 'asc' : 'desc');
        }


        if (isset($filters['prpmedio_votos_tmdb'])) {
            $query->orderBy('promedio_votos_tmdb', $filters['promedio_votos_tmdb'] === 'desc' ? 'asc' : 'desc');
        }

        if (isset($filters['prpmedio_votos_muvis'])) {
            $query->orderBy('promedio_votos_muvis', $filters['promedio_votos_muvis'] === 'desc' ? 'asc' : 'desc');
        }

        return $query->paginate(15);
    }


    public function getByPopular(): LengthAwarePaginator
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
        $frame = Frame::find($id);
        $genreIds = $frame->generos()->pluck('generos.id')->toArray();

        if (empty($genreIds)) throw new Exception('No hay peliculas similares');

        return Frame::categoriesData()
            ->whereHas('generos', function ($query) use ($genreIds) {
                $query->whereIn('generos.id', $genreIds);
            })
            ->where('id', '!=', $id)
            ->limit(15)
            ->get();
    }


    //se invoca en el use case para actualizar la puntuacion nuestra
    public function updateMuvisAverageRate(int $frameId, array $avgRates): bool
    {
        return Frame::where('id', $frameId)->update([
            'promedio_votos_muvis' => $avgRates['average'] ?? 0,
            'cantidad_votos_muvis' => $avgRates['votes'] ?? 0,
        ]);
    }
}
