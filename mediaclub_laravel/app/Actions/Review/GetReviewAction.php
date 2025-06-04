<?php

namespace App\Actions\Review;

use App\Traits\ApiResponse;
use App\UseCases\Review\GetReviewUseCase;
use App\Models\Resena;

class GetReviewAction
{
    use ApiResponse;

    protected $getReviewUseCase;

    public function __construct(GetReviewUseCase $getReviewUseCase)
    {
        $this->getReviewUseCase = $getReviewUseCase;
    }

    public function execute(Resena $resena)
    {
        $resena = $this->getReviewUseCase->execute($resena);
        return $this->success('Reseña cargada con exito',200,$resena);
    }
}
