<?php

namespace App\Actions\Rate;

use App\Traits\ApiResponse;
use App\UseCases\Rate\AddRateUseCase;
use App\Models\Usuario;
use App\Models\Frame;

class AddRateAction
{
    use ApiResponse;

    protected $addRateUseCase;

    public function __construct(AddRateUseCase $addRateUseCase)
    {
        $this->addRateUseCase = $addRateUseCase;
    }

    public function execute(Usuario $user,array $data, Frame $frame)
    {
        $rate = $this->addRateUseCase->execute($user,$data,$frame);
        return $this->success('Puntuacion añadida correctamente', 201,$rate);
    }
}
