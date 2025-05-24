<?php
namespace App\UseCases\Review;

use App\Repositories\Review\ReviewRepositoryInterface;
use Illuminate\Support\Collection;

class GetReviewsByUserUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(int $userId): Collection
    {
        return $this->reviewRepository->getReviewsByUser($userId);
    }
}
