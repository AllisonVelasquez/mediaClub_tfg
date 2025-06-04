<?php
namespace App\UseCases\List;

use App\Models\Frame;
use App\Repositories\List\ListRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetPublicListsByFrameUseCase
{
    protected $listRepository;

    public function __construct(ListRepositoryInterface $listRepository) {
        $this->listRepository = $listRepository;
    }
    public function execute(Frame $frame): LengthAwarePaginator
    {
        return $this->listRepository->getPublicListsByFrameId($frame->id);
    }
}
