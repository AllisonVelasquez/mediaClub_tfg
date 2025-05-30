<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Pagination\LengthAwarePaginator;

class SearchUserByAliasUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(string $alias) : LengthAwarePaginator
    {
        return $this->userRepository->searchByAlias($alias);
    }
}
