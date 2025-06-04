<?php
namespace App\UseCases\List;

use App\Models\Lista;
use App\Models\Usuario;
use App\Repositories\List\ListRepositoryInterface;
use App\Models\Frame;

class RemoveFrameFromListUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Usuario $user,Lista $list, Frame $frame): bool
    {
        return $this->listRepository->removeFrame($user->id, $list->id, $frame->id);
    }
}
