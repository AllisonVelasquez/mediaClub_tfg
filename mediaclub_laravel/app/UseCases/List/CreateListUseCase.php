<?php

namespace App\UseCases\List;

use App\Models\Lista;
use App\Repositories\List\ListRepositoryInterface;
use App\Repositories\Activity\ActivityRepositoryInterface;
use App\Models\Usuario;

class CreateListUseCase
{
    protected $listRepository;
    protected $activityRepository;

    public function __construct(ListRepositoryInterface $listRepository, ActivityRepositoryInterface $activityRepository)
    {
        $this->listRepository = $listRepository;
        $this->activityRepository = $activityRepository;
    }
    public function execute(Usuario $me, array $data): Lista
    {
        $data['usuario_id'] = $me->id;
        $list = $this->listRepository->create($data);

        $this->activityRepository->registrarActividad(
            usuario: $me,
            activitable: $list,
            tipo: 'crear_lista',
            descripcion: $me->alias . ' creó una lista',
        );

        return $list;
    }
}
