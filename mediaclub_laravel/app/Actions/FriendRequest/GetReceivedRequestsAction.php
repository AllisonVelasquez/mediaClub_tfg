<?php

namespace App\Actions\FriendRequest;

use App\Traits\ApiResponse;
use App\UseCases\FriendRequest\GetReceivedRequestsUseCase;
use App\Models\Usuario;

class GetReceivedRequestsAction
{
    use ApiResponse;
    protected $getReceivedRequestsUseCase;

    public function __construct(GetReceivedRequestsUseCase $getReceivedRequestsUseCase) {
        $this->getReceivedRequestsUseCase = $getReceivedRequestsUseCase;
    }
    public function execute(Usuario $user)
    {
        $request = $this->getReceivedRequestsUseCase->execute($user);
        return $this->success('Lista de solicitudes recibidas', 200, $request);
    }
}
