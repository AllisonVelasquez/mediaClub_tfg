<?php

namespace App\Actions\List;

use App\Models\Listum;
use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\DeleteListUseCase;

class DeleteListAction
{
    use ApiResponse;
    protected $deleteListUseCase;
    public function __construct(DeleteListUseCase $deleteListUseCase)
    {
        $this->deleteListUseCase = $deleteListUseCase;
    }

    public function execute(Usuario $me, Listum $list)
    {
        $this->deleteListUseCase->execute($me,$list);
        return $this->success('Lista eliminada exitosamente', 200);
    }
}
