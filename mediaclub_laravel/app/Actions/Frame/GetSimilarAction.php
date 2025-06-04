<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\GetSimilarUseCase;
use App\Models\Frame;

class GetSimilarAction
{
    use ApiResponse;

    protected $getSimilarUseCase;

    public function __construct(GetSimilarUseCase $getSimilarUseCase)
    {
        $this->getSimilarUseCase = $getSimilarUseCase;
    }

    public function execute(Frame $frame)
    {
        $frames = $this->getSimilarUseCase->execute($frame->id);
        if($frames->isEmpty()) return $this->success('Lista de peliculas similares vacía',200);
        return $this->success('Lista de peliculas similares cargada', 200, $frames);
    }
}
