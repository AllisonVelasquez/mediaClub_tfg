<?php

namespace App\Actions\Review;

use App\Traits\ApiResponse;
use App\UseCases\Review\GetReviewsByFrameUseCase;
use App\Models\Frame;

class GetReviewsByFrameAction
{
    use ApiResponse;

    protected $getReviewsByFrameUseCase;

    public function __construct(GetReviewsByFrameUseCase $getReviewsByFrameUseCase)
    {
        $this->getReviewsByFrameUseCase = $getReviewsByFrameUseCase;
    }

    public function execute(Frame $frame)
    {
        $this->getReviewsByFrameUseCase->execute($frame);
        return $this->success('Lista de reseñas cargada');
    }
}
