<?php
namespace App\UseCases\Review;

use App\Repositories\Review\ReviewRepositoryInterface;
use App\Models\Frame;
use Illuminate\Database\Eloquent\Collection;

class GetReviewsByFrameUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(Frame $frame) : Collection
    {
        $frameid = $frame->id;
        return $this->reviewRepository->getReviewsByFrame($frameid);
    }
}
