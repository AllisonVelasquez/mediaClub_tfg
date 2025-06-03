<?php
namespace App\UseCases\Actor;

use App\Repositories\Actor\ActorRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetFilmographyUseCase
{
    protected ActorRepositoryInterface $actorRepositoryInterface;

    public function __construct(ActorRepositoryInterface $actorRepositoryInterface)
    {
        $this->actorRepositoryInterface = $actorRepositoryInterface;
    }

    public function execute(int $id): LengthAwarePaginator
    {
        return $this->actorRepositoryInterface->getFilmography($id);
    }
}
