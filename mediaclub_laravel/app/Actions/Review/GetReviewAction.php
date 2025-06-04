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
        $this->getReviewUseCase->execute($resena->resena_id);
        return $this->success('Reseña cargada con exito');
    }
}
