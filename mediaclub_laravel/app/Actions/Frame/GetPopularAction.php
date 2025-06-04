<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\GetPopularUseCase;

class GetPopularAction
{
    use ApiResponse;

    protected $getPopularUseCase;

    public function __construct(GetPopularUseCase $getPopularUseCase)
    {
        $this->getPopularUseCase = $getPopularUseCase;
    }

    public function execute()
    {
        $frames = $this->getPopularUseCase->execute();
        if($frames->total() === 0) return $this->success('Lista Popular vacía',200);
        return $this->success('Lista Popular cargada', 200, $frames);
    }
}
