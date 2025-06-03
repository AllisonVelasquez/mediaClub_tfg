<?php

namespace App\Actions\Like;

use App\Traits\ApiResponse;
use App\UseCases\Like\RemoveLikeUseCase;
use App\Models\Usuario;

class RemoveLikeAction
{
    use ApiResponse;

    protected $removeLikeUseCase;

    public function __construct(RemoveLikeUseCase $removeLikeUseCase)
    {
        $this->removeLikeUseCase = $removeLikeUseCase;
    }

    public function execute(string $model,int $id, Usuario $me)
    {
        $this->removeLikeUseCase->execute($model, $id, $me);
        return $this->success('Like retirado exitosamente', 200);
    }
}
