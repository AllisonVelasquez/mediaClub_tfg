<?php
namespace App\UseCases\Post;

use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Post;

class GetPostUseCase
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository) {
        $this->postRepository = $postRepository;
    }
    public function execute(Usuario $user, Post $post): Post
    {
        return $this->postRepository->getPostById($user->id, $post->id);
    }
}
