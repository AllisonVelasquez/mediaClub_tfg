<?php

namespace App\Actions\Post;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Post\GetUserPostsUseCase;

class GetUserPostsAction
{
    use ApiResponse;

    protected $getUserPostsUseCase;

    public function __construct(GetUserPostsUseCase $getUserPostsUseCase)
    {
        $this->getUserPostsUseCase = $getUserPostsUseCase;
    }

    public function execute(Usuario $user)
    {
        $posts = $this->getUserPostsUseCase->execute($user);
        return $this->success('Listas de posts', 200, $posts);
    }
}
