<?php

namespace App\Actions\List;

use App\Models\Usuario;
use App\Traits\ApiResponse;
use App\UseCases\List\GetUserPublicListsUseCase;

class GetUserPublicListsAction
{
    use ApiResponse;

    protected $getUserPublicListsUseCase;

    public function __construct(GetUserPublicListsUseCase $getUserPublicListsUseCase)
    {
        $this->getUserPublicListsUseCase = $getUserPublicListsUseCase;
    }

    public function execute(Usuario $user)
    {
        $publicLists = $this->getUserPublicListsUseCase->execute($user);
        return $this->success('Listas publicas cargadas exitosamente', 200, $publicLists);
    }
}
