<?php
namespace App\UseCases\Frame;

use App\Repositories\Frame\FrameRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class GetTop10UseCase
{
    protected FrameRepositoryInterface $frameRepository;

    public function __construct(FrameRepositoryInterface $frameRepository)
    {
        $this->frameRepository = $frameRepository;
    }

    public function execute(): Collection
    {
        return $this->frameRepository->getTop10();
    }
}
