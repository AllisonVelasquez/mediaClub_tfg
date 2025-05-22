<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;
use App\Repositories\User\UserRepositoryInterface;

class GetSentRequestsUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository)
    {
        $this->requestRepository = $requestRepository;
    }

    public function execute(Usuario $user)
    {
        return $this->requestRepository->getSentRequests($user->usuario_id);
    }
}
