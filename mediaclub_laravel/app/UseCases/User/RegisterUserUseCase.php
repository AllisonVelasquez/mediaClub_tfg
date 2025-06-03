<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Notifications\UserRegistered;

class RegisterUserUseCase 
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(array $data)
    {
        $user = $this->userRepository->store($data);
        $user->notify(new UserRegistered($user));
        return $user;
    }
}
