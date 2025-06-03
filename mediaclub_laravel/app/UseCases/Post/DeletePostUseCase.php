<?php

namespace App\UseCases\Post;

use App\Models\Post;
use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;

class DeletePostUseCase
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function execute(Usuario $me, Post $post): bool
    {
        return $this->postRepository->delete($me->id,$post->id);
    }
}
