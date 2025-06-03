<?php

namespace App\Actions\User;
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
        $this->getUserActivitytUseCase->execute($user);
        return $this->success('Lista de actividad cargada correctamente', 200);
    }
}
