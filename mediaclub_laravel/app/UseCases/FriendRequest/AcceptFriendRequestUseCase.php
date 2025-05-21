<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Repositories\Friendship\FriendshipRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;

class AcceptFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;
    protected UserRepositoryInterface $userRepository;
    protected FriendshipRepositoryInterface $friendshipRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository, UserRepositoryInterface $userRepository,FriendshipRepositoryInterface $friendshipRepository)
    {
        $this->requestRepository = $requestRepository;
        $this->userRepository = $userRepository;
        $this->friendshipRepository = $friendshipRepository;
    }

    public function execute(int $me, string $user2)
    {
        $from = $this->userRepository->findByAlias($user2)->usuario_id;

        if($this->requestRepository->acceptRequest($me, $from)){
            $this->friendshipRepository->create($me,$from);
        }
        return true;
    }
}
