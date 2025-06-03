<?php

namespace App\UseCases\Rate;

use App\Repositories\Rate\RateRepositoryInterface;
use App\Repositories\Activity\ActivityRepositoryInterface;

use App\Models\Usuario;
use App\Models\Frame;
use App\Models\Puntuacion;

class AddRateUseCase
{
    protected $rateRepository;
    protected $activityRepository;


    public function __construct(RateRepositoryInterface $rateRepository, ActivityRepositoryInterface $activityRepository)
    {
        $this->rateRepository = $rateRepository;
        $this->activityRepository = $activityRepository;
    }

    public function execute(Usuario $user, array $data, Frame $frame): Puntuacion
    {
        $data['usuario_id'] = $user->id;
        $data['frame_id'] = $frame->id;

        $rate = $this->rateRepository->addRate($data);

        $this->activityRepository->registrarActividad(
            usuario: $user,
            activitable: $rate,
            tipo: 'crear_puntuacion',
            descripcion: $user->alias . ' puntuó una pelicula',
        );

        return $rate;
    }
}
