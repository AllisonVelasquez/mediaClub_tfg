<?php

namespace App\Actions\Review;

use App\Traits\ApiResponse;
use App\UseCases\Review\DeleteReviewUseCase;
use App\Models\Usuario;
use App\Models\Resena;

class DeleteReviewAction
{
    use ApiResponse;

    protected $deleteReviewUseCase;

    public function __construct(DeleteReviewUseCase $deleteReviewUseCase)
    {
        $this->deleteReviewUseCase = $deleteReviewUseCase;
    }

    public function execute(Usuario $user, Resena $review )
    {
        $this->deleteReviewUseCase->execute($user, $review);
        return $this->success('Reseña eliminada con exito');
    }
}
