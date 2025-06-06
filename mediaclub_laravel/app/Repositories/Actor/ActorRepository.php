<?php

namespace App\Repositories\Actor;

use App\Models\Actor;
use Illuminate\Pagination\LengthAwarePaginator;

class ActorRepository implements ActorRepositoryInterface
{
    public function findById(int $id): Actor
    {
        return Actor::findOrFail($id);
    }
    public function searchByName(string $name): LengthAwarePaginator
    {
        return Actor::where('nombre', 'like', '%' . $name . '%')->paginate(20);
    }
    public function allPaginated(): LengthAwarePaginator
    {
        return Actor::orderByDesc('popularidad')->paginate(20);
    }
    public function getFilmography(int $id): LengthAwarePaginator
    {
        $filmography = Actor::findOrFail($id)
            ->frames()
            ->select('frame.id', 'titulo', 'poster_url', 'fecha_estreno')
            ->orderByDesc('fecha_estreno')
            ->paginate(15);
        $filmography->getCollection()->transform(function ($frame) {
            return [
                'frame_id' => $frame->id,
                'titulo' => $frame->titulo,
                'poster_url' => $frame->poster_url,
                'personaje' => $frame->pivot->personaje ?? null,
            ];
        });


        return $filmography;
    }
}
