<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\FilterFramesUseCase;
use App\Models\Frame;

class FilterFramesAction
{
    use ApiResponse;

    protected $filterFramesUseCase;

    public function __construct(FilterFramesUseCase $filterFramesUseCase)
    {
        $this->filterFramesUseCase = $filterFramesUseCase;
    }

    public function execute(array $data)
    {
        $frames = $this->filterFramesUseCase->execute($data);
        if($frames->total() === 0) return $this->success('No se han encontrado peliculas con esos filtros',200);
        return $this->success('Peliculas filtradas cargadas', 200, $frames);
    }
}
