<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\GetReviewsUseCase;
use App\Models\Frame;

class GetReviewsAction
{
    use ApiResponse;

    protected $getReviewsUseCase;

    public function __construct(GetReviewsUseCase $getReviewsUseCase)
    {
        $this->getReviewsUseCase = $getReviewsUseCase;
    }

    public function execute(Frame $frame)
    {
        $reviews = $this->getReviewsUseCase->execute($frame->id);
        if($reviews->total() === 0) return $this->success('Lista de reseñas vacia',200);
        return $this->success('Lista de reseñas cargada', 200, $reviews);
    }
}
