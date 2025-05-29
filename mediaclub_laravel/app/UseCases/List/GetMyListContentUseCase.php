<?php

namespace App\UseCases\List;

use App\Models\Lista;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class GetListContentUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository)
    {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $user, Lista $list): Lista
    {
        return $this->listRepository->getMyListContent($user->id, $list->id);
    }
}
