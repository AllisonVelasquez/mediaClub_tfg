<?php

namespace App\UseCases\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Services\EmailService;

class RegisterUserUseCase
{
    protected UserRepositoryInterface $userRepository;
    // protected EmailService $emailService;   EmailService $emailService

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        // $this->emailService = $emailService;
    }

    public function execute(array $data)
    {
        return $this->userRepository->store($data);

        //Hay que ver si se puede hacer el envio por correo de bienvenido a la pagina al correo

    }
}
