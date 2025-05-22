<?php

namespace App\UseCases\List;

use App\Models\Listum;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class GetListContentUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository)
    {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $user, Listum $list): Listum
    {
        return $this->listRepository->getMyListContent($user->usuario_id, $list->lista_id);
    }
}
