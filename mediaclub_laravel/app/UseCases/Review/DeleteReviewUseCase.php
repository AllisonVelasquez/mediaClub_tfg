<?php
namespace App\UseCases\Review;

use App\Repositories\Review\ReviewRepositoryInterface;
use App\Models\Usuario;
use App\Models\Resena;
class DeleteReviewUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(Usuario $user, Resena $review) : bool
    {
        $userid = $user->usuario_id;
        $reviewid = $review->resena_id;
        return $this->reviewRepository->deleteReview($userid, $reviewid);
    }
}
