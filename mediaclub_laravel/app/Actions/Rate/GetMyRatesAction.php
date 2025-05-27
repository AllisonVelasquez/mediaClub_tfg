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
        $this->getMyRatesUseCase->execute($user->usuario_id);
        return $this->success('Puntuaciones cargadas con exito', 200);
    }
}
