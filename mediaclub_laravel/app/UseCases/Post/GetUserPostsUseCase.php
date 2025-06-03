<?php
namespace App\UseCases\Post;

use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetUserPostsUseCase
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository) {
        $this->postRepository = $postRepository;
    }
    public function execute(Usuario $user): LengthAwarePaginator
    {
        return $this->postRepository->getUserPosts($user->id);
    }
}
