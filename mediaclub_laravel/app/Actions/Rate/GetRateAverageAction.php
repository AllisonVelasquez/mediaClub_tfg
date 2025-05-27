<?php

namespace App\Actions\Rate;

use App\Traits\ApiResponse;
use App\UseCases\Rate\GetRateAverageUseCase;
use App\Models\Frame;

class GetRateAverageAction
{
    use ApiResponse;

    protected $getRateAverageUseCase;

    public function __construct(GetRateAverageUseCase $getRateAverageUseCase)
    {
        $this->getRateAverageUseCase = $getRateAverageUseCase;
    }

    public function execute(Frame $frame)
    {
        $this->getRateAverageUseCase->execute($frame);
        return $this->success('Puntuacion media cargada con exito');
    }
}
