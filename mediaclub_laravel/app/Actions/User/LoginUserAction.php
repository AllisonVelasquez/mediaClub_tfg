<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\Application\UseCases\User\LoginUserUseCase;

class LoginUserAction
{
    use ApiResponse;
    public function execute(array $data)
    {
        $userToken = app(LoginUserUseCase::class)->execute($data);
        return $this->success('Usuario logueado exitosamente', 200, $userToken);  
    }
}
