<?php

namespace App\Actions\Actor;

use App\Traits\ApiResponse;
use App\UseCases\Actor\GetActorByIdUseCase;
use App\Models\Actor;

class GetActorByIdAction
{
    use ApiResponse;

    protected $getActorByIdUseCase;

    public function __construct(GetActorByIdUseCase $getActorByIdUseCase)
    {
        $this->getActorByIdUseCase = $getActorByIdUseCase;
    }

    public function execute(Actor $actor)
    {
        $details = $this->getActorByIdUseCase->execute($actor);
        return $this->success('Detalles de actor cargados', 200, $details);
    }
}
