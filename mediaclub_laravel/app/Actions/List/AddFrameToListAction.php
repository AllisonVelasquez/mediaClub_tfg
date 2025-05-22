<?php

namespace App\Actions\List;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\AddFrameToListUseCase;
use App\Models\Listum;
use App\Models\Frame;

class AddFrameToListAction
{
    use ApiResponse;

    protected $addFrameToListUseCase;

    public function __construct(AddFrameToListUseCase $addFrameToListUseCase)
    {
        $this->addFrameToListUseCase = $addFrameToListUseCase;
    }

    public function execute(Usuario $user, Listum $list, Frame $frame)
    {
        $this->addFrameToListUseCase->execute($user, $list, $frame);
        return $this->success('Frame añadido correctamente a la lista', 200);
    }
}
