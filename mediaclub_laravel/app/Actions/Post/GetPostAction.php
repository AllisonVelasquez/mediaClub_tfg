<?php

namespace App\Actions\Post;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Post\GetPostUseCase;
use App\Models\Post;

class GetPostAction
{
    use ApiResponse;

    protected $getPostUseCase;

    public function __construct(GetPostUseCase $getPostUseCase)
    {
        $this->getPostUseCase = $getPostUseCase;
    }

    public function execute(Usuario $user,Post $post)
    {
        $post = $this->getPostUseCase->execute($user, $post);
        return $this->success('Post cargado con exito', 200, $post);
    }
}







