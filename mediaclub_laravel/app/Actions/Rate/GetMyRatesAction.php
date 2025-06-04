<?php

namespace App\Actions\Rate;

use App\Traits\ApiResponse;
use App\UseCases\Rate\GetMyRatesUseCase;
use App\Models\Usuario;

class GetMyRatesAction
{
    use ApiResponse;

    protected $getMyRatesUseCase;

    public function __construct(GetMyRatesUseCase $getMyRatesUseCase)
    {
        $this->getMyRatesUseCase = $getMyRatesUseCase;
    }

    public function execute(Usuario $user)
    {
        $rates = $this->getMyRatesUseCase->execute($user);
        if($rates->total() === 0) return $this->success('No se han encontrado puntuaciones', 200);

        return $this->success('Puntuaciones cargadas con exito', 200, $rates);
    }
}
