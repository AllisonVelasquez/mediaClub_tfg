<?php

namespace App\Actions\User;

use App\Traits\ApiResponse;
use App\Application\UseCases\User\LoginUserUseCase;

class LoginUserAction
{
    use ApiResponse;
    protected $loginUserUseCase;
    public function __construct(LoginUserUseCase $loginUserUseCase)
    {
        $this->loginUserUseCase = $$loginUserUseCase;
    }

    public function execute(array $data)
    {
        $userToken = $this->loginUserUseCase->execute($data);
        return $this->success('Usuario logueado exitosamente', 200, $userToken);
    }
}
