<?php

namespace App\Actions\Activity;
use App\UseCases\Activity\GetUserActivityUseCase;
use App\Traits\ApiResponse;
use App\Models\Usuario;


class GetUserActivityAction
{
    use ApiResponse;
    protected $getUserActivitytUseCase;

    public function __construct(GetUserActivityUseCase $getUserActivitytUseCase)
    {
        $this->getUserActivitytUseCase = $getUserActivitytUseCase;
    }

    public function execute(Usuario $user)
    {
        $actividad= $this->getUserActivitytUseCase->execute($user);
        if($actividad->total() === 0)  return $this->success('Lista de actividad vacia', 200);

        return $this->success('Lista de actividad cargada correctamente', 200,$actividad);
    }
}
