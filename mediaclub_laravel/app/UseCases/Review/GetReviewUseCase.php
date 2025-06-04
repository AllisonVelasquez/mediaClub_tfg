<?php
namespace App\UseCases\Review;

use App\Models\Resena;
use App\Repositories\Review\ReviewRepositoryInterface;

class GetReviewUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(Resena $resena) : Resena
    {
        return $this->reviewRepository->getReview($resena->id);
    }
}
