<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class GetUserInfoUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(int $id) : array
    {
        return $this->userRepository->getInfoUser($id);
    }
}
