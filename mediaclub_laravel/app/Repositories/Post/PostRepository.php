<?php

namespace App\Repositories\Post;

use App\Models\Post;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class PostRepository implements PostRepositoryInterface
{
    public function getMyPosts(int $userId): LengthAwarePaginator
    {
        return Post::where('usuario_id', $userId)
            ->orderByDesc('created_at')
            ->paginate(10);
    }

    public function getUserPosts(int $userId): LengthAwarePaginator
    {
        return Post::where('usuario_id', $userId)
            ->where('publico', true)
            ->orderByDesc('created_at')
            ->paginate(10);
    }

    public function getPostById(int $userId, int $postId): Post
    {
        return Post::with('usuario')
            ->where('usuario_id', $userId)
            ->findOrFail($postId);
    }

    public function create(array $data): Post
    {
        return Post::create($data);
    }

    public function update(int $userId, int $postId, array $data): bool
    {
        Post::where('usuario_id', $userId)->update($data);
        return true;
    }

    public function delete(int $userId, int $postId): bool
    {
        return Post::where('usuario_id', $userId)->delete() > 0;
    }
}
