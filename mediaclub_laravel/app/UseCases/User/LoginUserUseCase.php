<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\AuthenticationException;


class LoginUserUseCase
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(array $data)
    {
        $user = $this->userRepository->findByLoginId($data['login_id']);

        if (!Hash::check($data['contrasena'], $user->contrasena)) {
            throw new AuthenticationException();
        }

        $token = $user->createToken('Auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario_id' => $user->usuario_id
        ]);
    }
}


