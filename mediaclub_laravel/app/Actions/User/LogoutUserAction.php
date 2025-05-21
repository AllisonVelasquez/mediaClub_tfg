<?php

namespace App\Actions\User;

use App\UseCases\User\LogoutUserUseCase;
use App\Traits\ApiResponse;
use App\Models\Usuario;

class LogoutUserAction
{
    use ApiResponse;
    protected $logoutUserUseCase;
    public function __construct(LogoutUserUseCase $logoutUserUseCase)
    {
        $this->logoutUserUseCase = $logoutUserUseCase;
    }

    public function execute(Usuario $user)
    {
        if ($this->logoutUserUseCase->execute($user)) {
            return $this->success('Sesión finalizada', 200);
        }
        return $this->error('Ha ocurrido un error al cerrar la sesión', 403);
    }
}
