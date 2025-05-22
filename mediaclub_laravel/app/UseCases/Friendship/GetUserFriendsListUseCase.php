<?php

namespace App\UseCases\Friendship;

use App\Repositories\User\UserRepositoryInterface;
use App\Models\Usuario;

class GetUserFriendsListUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository, )
    {
        $this->userRepository = $userRepository;
    }

    public function execute(Usuario $user)
    {
        return $this->userRepository->listFriends($user->userid);
    }
}
