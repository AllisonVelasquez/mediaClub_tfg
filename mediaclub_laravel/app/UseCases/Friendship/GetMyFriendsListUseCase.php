<?php

namespace App\UseCases\Friendship;

use App\Repositories\User\UserRepositoryInterface;

class GetMyFriendsListUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(int $id)
    {
        return $this->userRepository->listMyFriends($id);
    }
}
