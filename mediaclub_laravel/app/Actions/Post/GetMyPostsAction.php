<?php

namespace App\Actions\Post;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Post\GetMyPostsUseCase;

class GetMyPostsAction
{
    use ApiResponse;

    protected $getMyPostsUseCase;

    public function __construct(GetMyPostsUseCase $getMyPostsUseCase)
    {
        $this->getMyPostsUseCase = $getMyPostsUseCase;
    }

    public function execute(Usuario $user)
    {
        $posts = $this->getMyPostsUseCase->execute($user);
        if($posts->total() === 0 )   return $this->success('Lista de posts vacia', 200);

        return $this->success('Lista de posts cargada', 200, $posts);
    }
}
