<?php
namespace App\UseCases\List;

use App\Models\Lista;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class UpdateListUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $me, Lista $list, array $data):bool
    {
        $user_id = $me->id;
        return $this->listRepository->delete($user_id, $list->id, $data);
    }
}
