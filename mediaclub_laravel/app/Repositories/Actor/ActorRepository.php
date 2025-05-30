<?php

namespace App\Repositories\Actor;

use App\Models\Actor;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ActorRepository implements ActorRepositoryInterface
{
    public function findById(int $actorId): Actor
    {
        return Actor::findOrFail($actorId);
    }
    public function searchByName(string $name): Collection
    {
        return Actor::where('name', 'like', '%' . $name . '%')->get();
    }
    public function getFramesByActorId(int $actorId): LengthAwarePaginator
    {
        return Actor::findOrFail($actorId)->frames->paginate(15);
    }
    public function allPaginated(): LengthAwarePaginator
    {
        return Actor::orderBy('name')->paginate(20);
    }
    public function getFilmography(int $id): Collection
{
    return Actor::findOrFail($id)->frames()->select('id', 'titulo', 'poster_url')->get();
}
}
