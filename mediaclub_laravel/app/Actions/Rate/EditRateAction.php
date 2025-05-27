<?php

namespace App\Actions\Rate;

use App\Traits\ApiResponse;
use App\UseCases\Rate\EditRateUseCase;
use App\Models\Usuario;
use App\Models\Puntuacion;

class EditRateAction
{
    use ApiResponse;

    protected $editRateUseCase;

    public function __construct(EditRateUseCase $editRateUseCase)
    {
        $this->editRateUseCase = $editRateUseCase;
    }

    public function execute(Usuario $user, array $data, Puntuacion $rate)
    {
        $this->editRateUseCase->execute($user, $data,$rate);
        return $this->success('Puntuacion actualizada con exito');
    }
}
