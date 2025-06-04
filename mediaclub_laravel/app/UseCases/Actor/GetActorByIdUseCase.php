<?php
namespace App\UseCases\Actor;

use App\Models\Actor;
use App\Repositories\Actor\ActorRepositoryInterface;

class GetActorByIdUseCase
{
    protected ActorRepositoryInterface $actorRepositoryInterface;

    public function __construct(ActorRepositoryInterface $actorRepositoryInterface)
    {
        $this->actorRepositoryInterface = $actorRepositoryInterface;
    }

    public function execute(Actor $actor): Actor
    {
        return $this->actorRepositoryInterface->findById($actor->id);
    }
}
