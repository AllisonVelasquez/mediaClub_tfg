<?php
namespace App\UseCases\Frame;

use App\Repositories\Frame\FrameRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class SearchFrameByTitleUseCase
{
    protected FrameRepositoryInterface $frameRepository;

    public function __construct(FrameRepositoryInterface $frameRepository)
    {
        $this->frameRepository = $frameRepository;
    }

    public function execute(string $title): LengthAwarePaginator
    {
        return $this->frameRepository->searchByTitle($title);
    }
}
