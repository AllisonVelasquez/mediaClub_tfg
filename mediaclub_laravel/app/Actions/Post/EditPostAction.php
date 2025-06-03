<?php

namespace App\Actions\Post;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Post\EditPostUseCase;
use App\Models\Post;

class EditPostAction
{
    use ApiResponse;

    protected $editPostUseCase;

    public function __construct(EditPostUseCase $editPostUseCase)
    {
        $this->editPostUseCase = $editPostUseCase;
    }

    public function execute(Usuario $me, Post $post, array $data)
    {
        $newPost = $this->editPostUseCase->execute($me, $post, $data);
        return $this->success('Post actualizado correctamente', 200, $newPost);
    }
}
