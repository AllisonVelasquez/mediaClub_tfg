<?php

namespace App\Repositories\Friendship;

use App\Models\Amistad;
use Illuminate\Http\JsonResponse;

interface FriendshipRepositoryInterface
{
    public function create(int $id1, int $id2): Amistad;
    public function delete(int $id1, int $id2): bool;
}