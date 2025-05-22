<?php
namespace App\UseCases\List;

use App\Models\Listum;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class UpdateListUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $me, Listum $list, array $data):bool
    {
        $user_id = $me->usuario_id;
        return $this->listRepository->delete($user_id, $list->lista_id, $data);
    }
}
