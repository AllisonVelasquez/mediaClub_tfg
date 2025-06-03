<?php
namespace App\UseCases\Post;

use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetMyPostsUseCase
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository) {
        $this->postRepository = $postRepository;
    }
    public function execute(Usuario $me): LengthAwarePaginator
    {
        return $this->postRepository->getMyPosts($me->id);
    }
}
