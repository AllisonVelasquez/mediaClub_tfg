<?php
namespace App\UseCases\Actor;

use App\Repositories\Actor\ActorRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class SearchByNameUseCase
{
    protected ActorRepositoryInterface $actorRepositoryInterface;

    public function __construct(ActorRepositoryInterface $actorRepositoryInterface)
    {
        $this->actorRepositoryInterface = $actorRepositoryInterface;
    }

    public function execute(string $name): LengthAwarePaginator
    {
        return $this->actorRepositoryInterface->searchByName($name);
    }
}
