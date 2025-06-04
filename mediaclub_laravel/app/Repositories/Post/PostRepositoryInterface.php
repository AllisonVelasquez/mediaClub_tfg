<?php
namespace App\Repositories\Post;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Post;

interface PostRepositoryInterface
{
    public function getMyPosts(int $userId): LengthAwarePaginator;
    public function getUserPosts(int $userId): LengthAwarePaginator;
    public function getPostById(int $userId, int $postId): Post;
    public function create(array $data): Post;
    public function update(int $userId, int $postId, array $data): bool;
    public function delete(int $userId, int $postId): bool;
}
