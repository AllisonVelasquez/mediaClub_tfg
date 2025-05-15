<?php

namespace App\Services\User;

use App\Repositories\User\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data)
    {
        return $this->userRepository->store($data);
    }

    public function login(array $credentials)
    {
        $user = $this->userRepository->findByLoginId($credentials['login_id']);

        if (!Hash::check($credentials['contrasena'], $user->contrasena)) {
            throw new AuthenticationException('Las credenciales son incorrectas.');
        }

        return $user;
    }

    public function delete($usuario_id)
    {

        return $this->userRepository->delete($usuario_id);
    }

    public function update(int $usuario_id, array $data)
    {
        return $this->userRepository->update($usuario_id, $data);
    }
}
