<?php

namespace App\Repositories\List;

use App\Models\Lista;
use Illuminate\Pagination\LengthAwarePaginator;

interface ListRepositoryInterface
{
    public function getMyLists(int $userId): LengthAwarePaginator;

    public function getMyListContent(int $userId, int $id): Lista;

    public function create(array $data): Lista;

    public function update(int $userid, int $id, array $data): bool;

    public function delete(int $userid, int $id): bool;

    public function addFrame(int $userid, int $listId, int $frameId): bool;

    public function removeFrame(int $userid, int $listId, int $frameId): bool;

    public function getPublicListsForUser(int $userId): LengthAwarePaginator;

    public function getPublicListContentForUser(int $userId, int $listId): Lista;

     public function getPublicListsByFrameId(int $frameId): LengthAwarePaginator ;
}
