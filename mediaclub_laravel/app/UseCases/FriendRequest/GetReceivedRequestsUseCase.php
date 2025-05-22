<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;

class GetReceivedRequestsUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository)
    {
        $this->requestRepository = $requestRepository;
    
    }

    public function execute(Usuario $user)
    {
        return $this->requestRepository->getReceivedRequests($user->usuario_id);
    }
}
