<?php
namespace App\UseCases\Frame;

use App\Repositories\Frame\FrameRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetPopularUseCase
{
    protected FrameRepositoryInterface $frameRepository;

    public function __construct(FrameRepositoryInterface $frameRepository)
    {
        $this->frameRepository = $frameRepository;
    }

    public function execute(): LengthAwarePaginator
    {
        return $this->frameRepository->getPopular();
    }
}
