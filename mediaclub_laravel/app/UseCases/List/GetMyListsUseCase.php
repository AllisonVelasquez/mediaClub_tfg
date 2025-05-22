<?php
namespace App\UseCases\List;

use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class GetMyListsUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $me):Collection
    {
        return $this->listRepository->getMyLists($me->usuario_id);
    }
}
