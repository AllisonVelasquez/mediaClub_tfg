<?php

namespace App\Repositories\Actor;

use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Actor;

Interface ActorRepositoryInterface
{
    public function findById(int $actorId): Actor;
    public function searchByName(string $name): LengthAwarePaginator;
    public function allPaginated(): LengthAwarePaginator;
    public function getFilmography(int $id): LengthAwarePaginator;
}
