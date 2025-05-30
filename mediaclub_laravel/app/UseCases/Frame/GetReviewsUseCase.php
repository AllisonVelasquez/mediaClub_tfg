<?php
namespace App\UseCases\Frame;

use App\Repositories\Frame\FrameRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetReviewsUseCase
{
    protected FrameRepositoryInterface $frameRepository;

    public function __construct(FrameRepositoryInterface $frameRepository)
    {
        $this->frameRepository = $frameRepository;
    }

    public function execute(int $frameid): LengthAwarePaginator
    {
        return $this->frameRepository->getReviews($frameid);
    }
}
