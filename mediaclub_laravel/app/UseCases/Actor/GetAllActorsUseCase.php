<?php
namespace App\UseCases\Actor;

use App\Repositories\Actor\ActorRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetAllActorsUseCase
{
    protected ActorRepositoryInterface $actorRepositoryInterface;

    public function __construct(ActorRepositoryInterface $actorRepositoryInterface)
    {
        $this->actorRepositoryInterface = $actorRepositoryInterface;
    }

    public function execute(): LengthAwarePaginator
    {
        return $this->actorRepositoryInterface->allPaginated();
    }
}
