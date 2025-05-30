<?php
namespace App\UseCases\Frame;

use App\Repositories\Frame\FrameRepositoryInterface;
use App\Models\Frame;

class GetFrameDetailsUseCase
{
    protected FrameRepositoryInterface $frameRepository;

    public function __construct(FrameRepositoryInterface $frameRepository)
    {
        $this->frameRepository = $frameRepository;
    }

    public function execute(int $frameid) : Frame
    {
        return $this->frameRepository->getDetails($frameid);
    }
}
