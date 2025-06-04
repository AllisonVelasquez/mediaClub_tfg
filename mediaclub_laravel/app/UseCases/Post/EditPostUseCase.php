<?php

namespace App\UseCases\Post;

use App\Models\Post;
use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;

class EditPostUseCase
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function execute(Usuario $me, Post $post, array $data): bool
    {
        return $this->postRepository->update($me->id,$post->id, $data);
    }
}
