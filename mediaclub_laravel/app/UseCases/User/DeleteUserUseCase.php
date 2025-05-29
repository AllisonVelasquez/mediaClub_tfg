<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use  App\Models\Usuario;

class DeleteUserUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(Usuario $user, array $data)
    {
        $loginCoincide = $user->login_id === $data['login_id'];
        $claveCorrecta = Hash::check($data['contrasena'], $user->contrasena);
        if (!($loginCoincide && $claveCorrecta)) {
            return false;
        }
        $user->tokens()->delete();
        return $this->userRepository->delete($user->id);
    }
}
