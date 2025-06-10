<?php

namespace App\Actions\Like;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\Like\GetLikesUseCase;


class GetLikesAction
{
    use ApiResponse;

    protected $getLikesUseCase;

    public function __construct(GetLikesUseCase $getLikesUseCase)
    {
        $this->getLikesUseCase = $getLikesUseCase;
    }

    public function execute(string $model,int $id,Usuario $usuario)
    {
        $likes = $this->getLikesUseCase->execute($model, $id,$usuario);
        return $this->success('Likes cargados exitosamente', 200, $likes,$usuario);
    }
}
