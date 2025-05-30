<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\SearchFrameByTitleUseCase;

class SearchFrameByTitleAction
{
    use ApiResponse;

    protected $searchFrameByTitleUseCase;

    public function __construct(SearchFrameByTitleUseCase $searchFrameByTitleUseCase)
    {
        $this->searchFrameByTitleUseCase = $searchFrameByTitleUseCase;
    }

    public function execute(array $data)
    {
        $frames = $this->searchFrameByTitleUseCase->execute($data['titulo']);
        if($frames->total() === 0) return $this->success('No hay peliculas con ese titulo',200);
        return $this->success('Lista de coincidencias cargada', 200, $frames);
    }
}
