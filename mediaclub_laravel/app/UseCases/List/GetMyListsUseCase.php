<?php
namespace App\UseCases\List;

use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetMyListsUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $me): LengthAwarePaginator
    {
        return $this->listRepository->getMyLists($me->id);
    }
}
