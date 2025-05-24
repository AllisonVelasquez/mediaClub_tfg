<?php

namespace App\Actions\Review;

use App\Traits\ApiResponse;
use App\UseCases\Review\CreateReviewUseCase;
use App\Models\Usuario;
use App\Models\Frame;

class CreateReviewAction
{
    use ApiResponse;

    protected $createReviewUseCase;

    public function __construct(CreateReviewUseCase $createReviewUseCase)
    {
        $this->createReviewUseCase = $createReviewUseCase;
    }

    public function execute(Usuario $user, array $data, Frame $frame)
    {
        $resena = $this->createReviewUseCase->execute($user, $data, $frame);
        return $this->success('Reseña cargada con exito',201, $resena);
    }
}
