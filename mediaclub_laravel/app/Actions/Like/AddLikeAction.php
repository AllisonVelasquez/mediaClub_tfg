<?php

namespace App\Actions\Like;

use App\Traits\ApiResponse;
use App\UseCases\Like\AddLikeUseCase;
use App\Models\Usuario;

class AddLikeAction
{
    use ApiResponse;

    protected $addLikeUseCase;

    public function __construct(AddLikeUseCase $addLikeUseCase)
    {
        $this->addLikeUseCase = $addLikeUseCase;
    }

    public function execute(string $model,int $id, Usuario $me)
    {
        $this->addLikeUseCase->execute($model, $id, $me);
        return $this->success('Like otorgado exitosamente', 200);
    }
}
