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
        return Actor::where('name', 'like', '%' . $name . '%')->paginate(20);
    }
    public function allPaginated(): LengthAwarePaginator
    {
        return Actor::orderBy('name')->paginate(20);
    }
    public function getFilmography(int $id): LengthAwarePaginator
    {
        return Actor::findOrFail($id)
            ->frames()
            ->withPivot('personaje')
            ->orderByDesc('fecha_estreno')
            ->select('frames.id', 'titulo', 'poster_url', 'fecha_estreno')
            ->paginate(15);
    }
}
