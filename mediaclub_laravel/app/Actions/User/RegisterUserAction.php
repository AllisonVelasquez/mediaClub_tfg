<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\UseCases\User\RegisterUserUseCase;

class RegisterUserAction
{
    use ApiResponse;
    protected $registerUserUseCase;
    public function __construct(RegisterUserUseCase $registerUserUseCase)
    {
        $this->registerUserUseCase = $registerUserUseCase;
    }

    public function execute(array $data)
    {
        $user = $this->registerUserUseCase->execute($data);
        return $this->success('Usuario creado exitosamente', 201, $user);
    }
}
