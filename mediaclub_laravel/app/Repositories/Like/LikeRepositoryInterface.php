<?php

namespace App\Repositories\Like;

use App\Models\Megusta;
use Illuminate\Pagination\LengthAwarePaginator;

interface LikeRepositoryInterface
{
    public function getLikes(string $likeableType, int $likeableId, int $userId);
    public function addLike(string $likeableType, int $likeableId, int $userId): Megusta;
    public function removeLike(string $likeableType, int $likeableId, int $userId): bool;
    public function resolveModelClass(string $likeableType): string;
}
