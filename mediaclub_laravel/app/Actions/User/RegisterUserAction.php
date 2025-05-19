<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\Application\UseCases\User\RegisterUserUseCase;

class RegisterUserAction
{
    use ApiResponse;
    public function execute(array $data)
    {
        $user = app(RegisterUserUseCase::class)->execute($data);
        return $this->success('Usuario creado exitosamente', 201, $user);
    }
}
