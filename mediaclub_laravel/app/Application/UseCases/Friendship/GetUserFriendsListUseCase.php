<?php

namespace App\Application\UseCases\Friendship;

use App\Repositories\User\UserRepositoryInterface;

class GetUserFriendsListUseCaseUse
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(int $id)
    {
        return $this->userRepository->listFriends($id);
    }
}
