<?php

namespace App\Actions\Actor;

use App\Traits\ApiResponse;
use App\UseCases\Actor\GetFilmographyUseCase;
use App\Models\Actor;

class GetFilmographyAction
{
    use ApiResponse;

    protected $getFilmographyUseCase;

    public function __construct(GetFilmographyUseCase $getFilmographyUseCase)
    {
        $this->getFilmographyUseCase = $getFilmographyUseCase;
    }

    public function execute(Actor $actor)
    {
        $frames = $this->getFilmographyUseCase->execute($actor->id);
        if($frames->total() === 0) return $this->success('No hay peliculas para ese actor',200);
        return $this->success('Filmografia cargada', 200, $frames);
    }
}
