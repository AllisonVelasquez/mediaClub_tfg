<?php
namespace App\UseCases\Review;

use App\Repositories\Review\ReviewRepositoryInterface;
use App\Models\Usuario;
use App\Models\Frame;
use Illuminate\Database\Eloquent\Collection;

class GetMyReviewsByFrameUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(Usuario $user, Frame $frame) : Collection
    {
        $userid = $user->usuario_id;
        $frameid = $frame->frame_id;
        return $this->reviewRepository->getMyReviewsByFrame($userid, $frameid);
    }
}
