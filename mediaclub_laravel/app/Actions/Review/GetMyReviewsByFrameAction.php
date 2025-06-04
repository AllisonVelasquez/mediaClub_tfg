<?php

namespace App\Actions\Review;

use App\Traits\ApiResponse;
use App\UseCases\Review\GetMyReviewsByFrameUseCase;
use App\Models\Usuario;
use App\Models\Frame;

class GetMyReviewsByFrameAction
{
    use ApiResponse;

    protected $getMyReviewsByFrameUseCase;

    public function __construct(GetMyReviewsByFrameUseCase $getMyReviewsByFrameUseCase)
    {
        $this->getMyReviewsByFrameUseCase = $getMyReviewsByFrameUseCase;
    }

    public function execute(Usuario $user, Frame $frame )
    {
        $resenas = $this->getMyReviewsByFrameUseCase->execute($user, $frame);
        if($resenas->isEmpty())return $this->success('No se han encontrado reseñas para esa pelicula',200);
        return $this->success('Reseñas realizadas',200,$resenas);
    }
}
