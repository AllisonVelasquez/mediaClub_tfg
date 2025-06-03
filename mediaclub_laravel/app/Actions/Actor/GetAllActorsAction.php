<?php

namespace App\Actions\Actor;

use App\Traits\ApiResponse;
use App\UseCases\Actor\GetAllActorsUseCase;

class GetAllActorsAction
{
    use ApiResponse;

    protected $getAllActorsUseCase;

    public function __construct(GetAllActorsUseCase $getAllActorsUseCase)
    {
        $this->getAllActorsUseCase = $getAllActorsUseCase;
    }

    public function execute()
    {
        $actors = $this->getAllActorsUseCase->execute();
        if($actors->total() === 0) return $this->success('No hay actores disponibles',200);
        return $this->success('Lista de actores cargada de forma exitosa', 200, $actors);
    }
}
