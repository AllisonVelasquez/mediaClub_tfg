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
        $resenas = $this->getReviewsByUserUseCase->execute($user->id);
        if ($resenas->total() === 0)  return $this->success('Lista de reseñas vacia', 200);
        return $this->success('Lista de reseñas cargada', 200, $resenas);
    }
}
