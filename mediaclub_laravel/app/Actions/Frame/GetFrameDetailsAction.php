<?php

namespace App\Actions\Frame;

use App\Traits\ApiResponse;
use App\UseCases\Frame\GetFrameDetailsUseCase;
use App\Models\Frame;

class GetFrameDetailsAction
{
    use ApiResponse;

    protected $getFrameDetailsUseCase;

    public function __construct(GetFrameDetailsUseCase $getFrameDetailsUseCase)
    {
        $this->getFrameDetailsUseCase = $getFrameDetailsUseCase;
    }

    public function execute(Frame $frame)
    {
        $details = $this->getFrameDetailsUseCase->execute($frame->id);
        return $this->success('Pelicula cargada con exito', 200, $details);
    }
}
