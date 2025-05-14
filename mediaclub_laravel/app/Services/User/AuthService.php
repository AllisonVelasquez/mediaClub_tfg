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
        //Añadir el envio del correo y la verificacion de la cuenta
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

    // Aquí puedes generar un token si usas JWT o Passport
    // return $user->createToken('YourAppName')->plainTextToken;

    // event(new Login($user));

    // Si no usas JWT, puedes devolver el usuario o cualquier cosa que necesites.
}
