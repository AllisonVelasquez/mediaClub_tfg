<?php

namespace App\Application\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;
use App\Repositories\User\UserRepositoryInterface;

class GetReceivedRequestsUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;
    protected UserRepositoryInterface $userRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository, UserRepositoryInterface $userRepository)
    {
        $this->requestRepository = $requestRepository;
        $this->userRepository = $userRepository;
    }

    public function execute(Usuario $user)
    {
        $user = $user->usuario_id;
        return $this->requestRepository->getReceivedRequests($user);
    }
}
