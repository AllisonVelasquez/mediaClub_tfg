<?php
namespace App\UseCases\Frame;

use App\Repositories\Frame\FrameRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class GetSimilarUseCase
{
    protected FrameRepositoryInterface $frameRepository;

    public function __construct(FrameRepositoryInterface $frameRepository)
    {
        $this->frameRepository = $frameRepository;
    }

    public function execute(int $frameid): Collection
    {
        return $this->frameRepository->getSimilar($frameid);
    }
}
