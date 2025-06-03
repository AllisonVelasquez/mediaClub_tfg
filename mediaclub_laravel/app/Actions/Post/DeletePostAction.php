<?php

namespace App\Actions\Post;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Post\DeletePostUseCase;
use App\Models\Post;

class DeletePostAction
{
    use ApiResponse;

    protected $deletePostUseCase;

    public function __construct(DeletePostUseCase $deletePostUseCase)
    {
        $this->deletePostUseCase = $deletePostUseCase;
    }

    public function execute(Usuario $me, Post $post)
    {
        $this->deletePostUseCase->execute($me, $post);
        return $this->success('Post eliminado correctamente', 200);
    }
}
