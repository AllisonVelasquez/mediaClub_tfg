<?php
namespace App\UseCases\List;

use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetUserPublicListsUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $user): LengthAwarePaginator
    {
        return $this->listRepository->getPublicListsForUser($user->id);
    }
}
