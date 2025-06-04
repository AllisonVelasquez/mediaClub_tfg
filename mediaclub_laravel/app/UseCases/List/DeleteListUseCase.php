<?php
namespace App\UseCases\List;

use App\Models\Lista;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class DeleteListUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $me,Lista $list):bool
    {
        $user_id = $me->id;
        $lista_id = $list->id;
        return $this->listRepository->delete($user_id, $lista_id);
    }
}
