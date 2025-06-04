<?php

namespace App\Repositories\Like;

use App\Models\Megusta;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface LikeRepositoryInterface
{
    public function getLikes(string $likeableType, int $likeableId);
    public function addLike(string $likeableType, int $likeableId, int $userId): Megusta;
    public function removeLike(string $likeableType, int $likeableId, int $userId): bool;
    public function resolveModelClass(string $likeableType): string;
}
