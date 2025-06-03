<?php

namespace App\UseCases\Post;

use App\Models\Post;
use App\Models\Usuario;
use App\Repositories\Post\PostRepositoryInterface;

class CreatePostUseCase
{
    protected $postRepository;

    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function execute(Usuario $me, array $data): Post
    {
        $data['usuario_id'] = $me->id;
        return $this->postRepository->create($data);
    }
}
