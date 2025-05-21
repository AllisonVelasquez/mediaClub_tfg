<?php

namespace App\Repositories\List;

use App\Models\Listum;
use App\Repositories\List\ListRepositoryInterface;
use Illuminate\Support\Collection;

class ListRepository implements ListRepositoryInterface
{
    public function getByUserId(int $userId): Collection
    {
        return Listum::where('user_id', $userId)->get();
    }

    public function create(array $data): Listum
    {
        return Listum::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $lista = Listum::findOrFail($id);
        return $lista->update($data);
    }

    public function delete(int $id): bool
    {
        $lista = Listum::findOrFail($id);
        return $lista->delete();
    }

    // public function find(int $id): mixed
    // {
    //     return Listum::findOrFail($id);
    // }

    public function addFrame(int $listId, int $frameId): void
    {
        $lista = Listum::findOrFail($listId);
        $lista->frames()->attach($frameId);
    }

    public function removeFrame(int $listId, int $frameId): void
    {
        $lista = Listum::findOrFail($listId);
        $lista->frames()->detach($frameId);
    }

    public function getPublicListsForUser(int $userId): Collection
    {
        return Listum::where('user_id', $userId)
            ->where('publica', true)
            ->get();
    }

    public function getPublicListContentForUser(int $userId, int $listId): mixed
    {
        return Listum::where('id', $listId)
            ->where('user_id', $userId)
            ->where('publica', true)
            ->firstOrFail();
    }
}
