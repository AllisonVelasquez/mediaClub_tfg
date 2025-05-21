<?php

namespace App\Repositories\List;

use App\Models\Listum;
use Illuminate\Support\Collection;

interface ListRepositoryInterface
{
     public function getByUserId(int $userId): Collection;

    public function create(array $data): mixed;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;

    public function addFrame(int $listId, int $frameId): void;

    public function removeFrame(int $listId, int $frameId): void;

    public function getPublicListsForUser(int $userId): Collection;

    public function getPublicListContentForUser(int $userId, int $listId): mixed;
}
