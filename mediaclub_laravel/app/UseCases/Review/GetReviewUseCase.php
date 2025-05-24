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

    public function execute(int $resenaId) : Resena
    {
        return $this->reviewRepository->getReview($resenaId);
    }
}
