<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\Application\UseCases\FriendRequest\GetSentRequestsUseCase;
use App\Models\Usuario;

class GetSentRequestsAction
{
    use ApiResponse;
    protected $getSentRequestsUseCase;

    public function __construct(GetSentRequestsUseCase $getSentRequestsUseCase) {
        $this->getSentRequestsUseCase = $getSentRequestsUseCase;
    }
    public function execute(Usuario $user)
    {
        //falta crear la amistad
        $request = $this->getSentRequestsUseCase->execute($user);
        return $this->success('Lista de solicitudes enviadas', 200, $request);
    }
}
