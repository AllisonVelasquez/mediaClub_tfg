<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\GetTop10UseCase;

class GetTop10Action
{
    use ApiResponse;

    protected $getTop10UseCase;

    public function __construct(GetTop10UseCase $getTop10UseCase)
    {
        $this->getTop10UseCase = $getTop10UseCase;
    }

    public function execute()
    {
        $frames = $this->getTop10UseCase->execute();
        if($frames->isEmpty()) return $this->success('Lista Top 10 vacía',200);
        return $this->success('Lista Top 10 cargada', 200, $frames);
    }
}
