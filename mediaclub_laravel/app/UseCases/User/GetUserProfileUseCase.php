<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Models\Usuario;

class GetUserProfileUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(string $alias): Usuario
    {
        $user = $this->userRepository->findByAlias($alias);

        return $user->makeHidden(['contrasena', 'usuario_id', 'login_id', 'confirmado']);
    }
}
