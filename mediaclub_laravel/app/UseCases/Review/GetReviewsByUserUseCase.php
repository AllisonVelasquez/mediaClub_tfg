<?php
namespace App\UseCases\Review;

use App\Repositories\Review\ReviewRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetReviewsByUserUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(int $userId): LengthAwarePaginator
    {
        return $this->reviewRepository->getReviewsByUser($userId);
    }
}
