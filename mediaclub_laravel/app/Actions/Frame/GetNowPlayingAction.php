<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\GetNowPlayingUseCase;

class GetNowPlayingAction
{
    use ApiResponse;

    protected $getNowPlayingUseCase;

    public function __construct(GetNowPlayingUseCase $getNowPlayingUseCase)
    {
        $this->getNowPlayingUseCase = $getNowPlayingUseCase;
    }

    public function execute()
    {
        $frames = $this->getNowPlayingUseCase->execute();
        if($frames->total()=== 0) return $this->success('Lista Ahora vacía',200);
        return $this->success('Lista Ahora cargada', 200, $frames);
    }
}
