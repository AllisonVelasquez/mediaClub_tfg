<?php

namespace App\Actions\List;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\RemoveFrameFromListUseCase;
use App\Models\Lista;
use App\Models\Frame;

class RemoveFrameFromListAction
{
    use ApiResponse;

    protected $removeFrameFromListUseCase;

    public function __construct(RemoveFrameFromListUseCase $removeFrameFromListUseCase)
    {
        $this->removeFrameFromListUseCase = $removeFrameFromListUseCase;
    }

    public function execute(Usuario $user, Lista $list, Frame $frame)
    {
        $this->removeFrameFromListUseCase->execute($user, $list, $frame);
        return $this->success('Frame eliminado exitosamente de la lista', 200);
    }
}
