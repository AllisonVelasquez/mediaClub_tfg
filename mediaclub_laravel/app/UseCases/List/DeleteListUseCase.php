<?php
namespace App\UseCases\List;

use App\Models\Listum;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class DeleteListUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $me,Listum $list):bool
    {
        $user_id = $me->usuario_id;
        $lista_id = $list->lista_id;
        return $this->listRepository->delete($user_id, $lista_id);
    }
}
