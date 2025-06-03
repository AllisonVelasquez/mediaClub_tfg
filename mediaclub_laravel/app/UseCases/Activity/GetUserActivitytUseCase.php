<?php

namespace App\UseCases\Activity;

use App\Models\Actividad;
use App\Models\Usuario;
use App\Repositories\Activity\ActivityRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetUserActivityUseCase
{
    protected $activityRepository;

    public function __construct(ActivityRepositoryInterface $activityRepository)
    {
        $this->activityRepository = $activityRepository;
    }
    public function execute(Usuario $user): LengthAwarePaginator
    {
        return $this->activityRepository->getActivity($user->id);
    }
}
