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
        $this->getMyReviewsByFrameUseCase->execute($user, $frame);
        return $this->success('Lista de reseñas cargada');
    }
}
