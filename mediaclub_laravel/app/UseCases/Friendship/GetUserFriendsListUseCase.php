<?php

namespace App\UseCases\Friendship;

use App\Repositories\User\UserRepositoryInterface;

class GetUserFriendsListUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository, )
    {
        $this->userRepository = $userRepository;
    }

    public function execute(string $alias)
    {
        $userid = $this->userRepository->findByAlias($alias)->usuario_id;
        return $this->userRepository->listFriends($userid);
    }
}
