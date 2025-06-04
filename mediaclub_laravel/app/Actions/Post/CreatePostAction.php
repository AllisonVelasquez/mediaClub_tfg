<?php

namespace App\Actions\Post;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Post\CreatePostUseCase;

class CreatePostAction
{
    use ApiResponse;

    protected $createPostUseCase;

    public function __construct(CreatePostUseCase $createPostUseCase)
    {
        $this->createPostUseCase = $createPostUseCase;
    }

    public function execute(Usuario $me, array $data)
    {
        $newPost = $this->createPostUseCase->execute($me, $data);
        return $this->success('Post creado con exito', 201, $newPost);
    }
}
