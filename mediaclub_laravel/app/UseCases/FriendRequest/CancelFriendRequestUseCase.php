<?php

namespace App\UseCases\FriendRequest;

use App\Repositories\FriendRequest\FriendRequestRepositoryInterface;
use App\Models\Usuario;
use App\Repositories\User\UserRepositoryInterface;

class CancelFriendRequestUseCase
{
    protected FriendRequestRepositoryInterface $requestRepository;
    protected UserRepositoryInterface $userRepository;

    public function __construct(FriendRequestRepositoryInterface $requestRepository, UserRepositoryInterface $userRepository)
    {
        $this->requestRepository = $requestRepository;
        $this->userRepository = $userRepository;
    }

    public function execute(Usuario $user, array $data)
    {
        $rem = $user->usuario_id;

        $dest = $this->userRepository->findByAlias($data['alias'])->usuario_id;

        return $this->requestRepository->cancelRequest($rem, $dest);
    }
}
