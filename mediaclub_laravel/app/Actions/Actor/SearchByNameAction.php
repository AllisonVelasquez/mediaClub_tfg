<?php

namespace App\Actions\Actor;

use App\Traits\ApiResponse;
use App\UseCases\Actor\SearchByNameUseCase;

class SearchByNameAction
{
    use ApiResponse;

    protected $searchByNameUseCase;

    public function __construct(SearchByNameUseCase $searchByNameUseCase)
    {
        $this->searchByNameUseCase = $searchByNameUseCase;
    }

    public function execute(array $data)
    {
        $actors = $this->searchByNameUseCase->execute($data['nombre']);
        if($actors->total() === 0) return $this->success('No hay actores con ese nombre',200);
        return $this->success('Lista de coincidencias cargada', 200, $actors);
    }
}
