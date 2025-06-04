<?php

namespace App\Actions\List;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\GetMyListsUseCase;

class GetMyListsAction
{
    use ApiResponse;

    protected $getMyListsUseCase;

    public function __construct(GetMyListsUseCase $getMyListsUseCase)
    {
        $this->getMyListsUseCase = $getMyListsUseCase;
    }

    public function execute(Usuario $me)
    {
        $myLists = $this->getMyListsUseCase->execute($me);
        return $this->success('Listas cargadas exitosamente', 200, $myLists);
    }
}
