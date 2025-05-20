<?php

namespace App\Application\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;
use App\Repositories\Friendship\FriendshipRepository;
use App\Repositories\User\UserRepositoryInterface;

class AcceptFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;
    protected UserRepositoryInterface $userRepository;
    protected FriendshipRepository $friendshipRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository, UserRepositoryInterface $userRepository,FriendshipRepository $friendshipRepository)
    {
        $this->requestRepository = $requestRepository;
        $this->userRepository = $userRepository;
        $this->friendshipRepository = $friendshipRepository;
    }

    public function execute(Usuario $user, array $data)
    {
        $rem = $user->usuario_id;

        $dest = $this->userRepository->findByAlias($data['alias'])->usuario_id;

        if($this->requestRepository->acceptRequest($rem, $dest)){
            $this->friendshipRepository->create($rem,$dest);
        }
        return true;
    }
}
