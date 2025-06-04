<?php

namespace App\Repositories\List;

use App\Models\Lista;
use App\Repositories\List\ListRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class ListRepository implements ListRepositoryInterface
{
    public function getMyLists(int $userId): LengthAwarePaginator
    {
        return Lista::with((['frames_img' => function ($query) {
            $query->limit(4);
        }]))
            ->where('usuario_id', $userId)
            ->paginate(15);
    }

    public function getMyListContent(int $userId, int $listId): Lista
    {
        return Lista::with((['frames' => function ($query) {
            $query->paginate(15);
        }]))
            ->where('id', $listId)
            ->where('usuario_id', $userId)
            ->first();
    }

    public function create(array $data): Lista
    {
        return Lista::create($data);
    }

    public function update(int $userid, int $id, array $data): bool
    {
        $lista = Lista::where('id', $id)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        return $lista->update($data);
    }

    public function delete(int $userid, int $id): bool
    {
        $lista = Lista::where('id', $id)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        return $lista->delete();
    }

    public function addFrame(int $userid, int $listId, int $frameId): bool
    {
        $lista = Lista::where('id', $listId)
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
        $lista = Lista::where('id', $listId)
            ->where('usuario_id', $userid)
            ->firstOrFail();

        return $lista->frames()->detach($frameId) > 0;
    }

    public function getPublicListsForUser(int $userId): LengthAwarePaginator
    {
        return Lista::with((['framesImg' => function ($query) {
            $query->limit(4);
        }]))
            ->where('usuario_id', $userId)
            ->where('publica', true)
            ->paginate(15);
    }

    public function getPublicListContentForUser(int $userId, int $listId): Lista
    {
        return Lista::with((['frames' => function ($query) {
            $query->paginate(15);
        }]))
            ->where('id', $listId)
            ->where('usuario_id', $userId)
            ->where('publica', true)
            ->first();
    }

    public function getPublicListsByFrameId(int $frameId): LengthAwarePaginator 
    {
        return Lista::where('publica', true)
            ->whereHas('frames', function ($query) use ($frameId) {
                $query->where('id', $frameId);
            })
            ->paginate(15);
    }
}
