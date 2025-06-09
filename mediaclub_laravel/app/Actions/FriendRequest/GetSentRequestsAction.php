<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\UseCases\FriendRequest\GetSentRequestsUseCase;
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
        $request = $this->getSentRequestsUseCase->execute($user);
        if($request->isEmpty()) {
            return $this->error('Lista de solicitudes enviadas vacia', 200);
        }
        return $this->success('Lista de solicitudes enviadas', 200, $request);
    }
}
