<?php
namespace App\UseCases\List;

use Illuminate\Support\Collection;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;

class GetUserPublicListsUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $user): Collection
    {
        return $this->listRepository->getPublicListsForUser($user->usuario_id);
    }
}
