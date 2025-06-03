<?php

namespace App\UseCases\Review;

use App\Models\Resena;
use App\Repositories\Review\ReviewRepositoryInterface;
use App\Models\Usuario;
use App\Models\Frame;
use App\Repositories\Activity\ActivityRepositoryInterface;

class CreateReviewUseCase
{
    protected  $reviewRepository;
    protected $activityRepository;


    public function __construct(ReviewRepositoryInterface $reviewRepository, ActivityRepositoryInterface $activityRepository)
    {
        $this->reviewRepository = $reviewRepository;
        $this->activityRepository = $activityRepository;
    }

    public function execute(Usuario $user, array $data, Frame $frame): Resena
    {
        $data['usuario_id'] = $user->id;
        $data['frame_id'] = $frame->id;
        $review = $this->reviewRepository->addReview($data);

        $this->activityRepository->registrarActividad(
            usuario: $user,
            activitable: $review,
            tipo: 'crear_resena',
            descripcion: $user->alias . ' creó una resena',
        );

        return $review;
    }
}
