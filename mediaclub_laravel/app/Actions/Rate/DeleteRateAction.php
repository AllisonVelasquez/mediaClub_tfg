<?php

namespace App\Actions\Rate;

use App\Models\Puntuacion;
use App\Traits\ApiResponse;
use App\UseCases\Rate\DeleteRateUseCase;
use App\Models\Usuario;

class DeleteRateAction
{
    use ApiResponse;

    protected $deleteRateUseCase;

    public function __construct(DeleteRateUseCase $deleteRateUseCase)
    {
        $this->deleteRateUseCase = $deleteRateUseCase;
    }

    public function execute(Usuario $user, Puntuacion $rate)
    {
        $this->deleteRateUseCase->execute($user,$rate);
        return $this->success('Puntuacion eliminada con exito');
    }
}
