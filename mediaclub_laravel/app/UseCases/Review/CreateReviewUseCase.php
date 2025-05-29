<?php
namespace App\UseCases\Review;

use App\Models\Resena;
use App\Repositories\Review\ReviewRepositoryInterface;
use App\Models\Usuario;
use App\Models\Frame;

class CreateReviewUseCase
{
    protected ReviewRepositoryInterface $reviewRepository;

    public function __construct(ReviewRepositoryInterface $reviewRepository)
    {
        $this->reviewRepository = $reviewRepository;
    }

    public function execute(Usuario $user, array $data, Frame $frame) : Resena
    {
        $data['usuario_id'] = $user->id;
        $data['frame_id'] = $frame->id;
        return $this->reviewRepository->addReview($data);
    }
}
