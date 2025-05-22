<?php

namespace App\Repositories\List;

use App\Models\Listum;
use App\Repositories\List\ListRepositoryInterface;
use Exception;
use Illuminate\Support\Collection;

class ListRepository implements ListRepositoryInterface
{
    public function getMyLists(int $userId): Collection
    {
        return Listum::where('usuario_id', $userId)->get();
    }

    public function getMyListContent(int $userId, int $listId): Listum
    {
        return Listum::where('lista_id',$listId)
            ->where('usuario_id', $userId)
            ->get();
    }

    public function create(array $data): Listum
    {
        return Listum::create($data);
    }

    public function update(int $userid, int $id, array $data): bool
    {
        $lista = Listum::where('lista_id', $id)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        return $lista->update($data);
    }

    public function delete(int $userid, int $id): bool
    {
        $lista = Listum::where('lista_id', $id)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        return $lista->delete();
    }

    public function addFrame(int $userid, int $listId, int $frameId): bool
    {
        $lista = Listum::where('lista_id', $listId)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        if (!$lista->frames()->where('frame_id', $frameId)->exists()) {
            $lista->frames()->attach($frameId);
            return true;
        }
        return false;
    }

    public function removeFrame(int $userid, int $listId, int $frameId): bool
    {
        $lista = Listum::where('lista_id', $listId)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        return $lista->frames()->detach($frameId) > 0;
    }

    public function getPublicListsForUser(int $userId): Collection
    {
        return Listum::where('usuario_id', $userId)
            ->where('publica', true)
            ->get();
    }

    public function getPublicListContentForUser(int $userId, int $listId): Collection
    {
        return Listum::where('lista_id', $listId)
            ->where('usuario_id', $userId)
            ->where('publica', true)
            ->firstOrFail();
    }
}
