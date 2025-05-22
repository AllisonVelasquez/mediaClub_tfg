<?php

namespace App\Repositories\List;

use App\Models\Listum;
use Illuminate\Support\Collection;

interface ListRepositoryInterface
{
    public function getMyLists(int $userId): Collection;

    public function getMyListContent(int $userId, int $id): Listum;

    public function create(array $data): Listum;

    public function update(int $userid, int $id, array $data): bool;

    public function delete(int $userid, int $id): bool;

    public function addFrame(int $userid, int $listId, int $frameId): bool;

    public function removeFrame(int $userid, int $listId, int $frameId): bool;

    public function getPublicListsForUser(int $userId): Collection;

    public function getPublicListContentForUser(int $userId, int $listId): Collection;
}
