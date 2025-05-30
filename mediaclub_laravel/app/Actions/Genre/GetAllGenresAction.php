<?php

namespace App\Actions\Genre;

use App\Traits\ApiResponse;
use App\UseCases\Genre\GetAllGenresUseCase;

class GetAllGenresAction
{
    use ApiResponse;

    protected $getAllGenresUseCase;

    public function __construct(GetAllGenresUseCase $getAllGenresUseCase)
    {
        $this->getAllGenresUseCase = $getAllGenresUseCase;
    }

    public function execute()
    {
        $genres = $this->getAllGenresUseCase->execute();
        if($genres->total() === 0) return $this->success('Lista de generos vacía', 200);
        return $this->success('Lista de generos cargada con exito',200,$genres);
    }
}
