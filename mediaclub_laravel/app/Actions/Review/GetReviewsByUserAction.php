<?php

namespace App\Actions\Review;

use App\Traits\ApiResponse;
use App\UseCases\Review\GetReviewsByUserUseCase;
use App\Models\Usuario;

class GetReviewsByUserAction
{
    use ApiResponse;

    protected $getReviewsByUserUseCase;

    public function __construct(GetReviewsByUserUseCase $getReviewsByUserUseCase)
    {
        $this->getReviewsByUserUseCase = $getReviewsByUserUseCase;
    }

    public function execute(Usuario $user)
    {
        $this->getReviewsByUserUseCase->execute($user->usuario_id);
        return $this->success('Reseña creada con exito', 201);
    }
}
