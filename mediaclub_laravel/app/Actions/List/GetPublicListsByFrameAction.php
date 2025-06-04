<?php

namespace App\Actions\List;

use App\Models\Frame;
use App\Traits\ApiResponse;
use App\UseCases\List\GetPublicListsByFrameUseCase;

class GetPublicListsByFrameAction
{
    use ApiResponse;

    protected $getPublicListsByFrameUseCase;

    public function __construct(GetPublicListsByFrameUseCase $getPublicListsByFrameUseCase)
    {
        $this->getPublicListsByFrameUseCase = $getPublicListsByFrameUseCase;
    }

    public function execute(Frame $frame)
    {
        $publicLists = $this->getPublicListsByFrameUseCase->execute($frame);
        return $this->success('Listas publicas cargadas exitosamente', 200, $publicLists);
    }
}
