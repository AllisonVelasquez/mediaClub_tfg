<?php

namespace App\Actions\User;

use App\Application\UseCases\User\LogoutUserUseCase;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class LogoutUserAction
{
    use ApiResponse;
    protected $logoutUserUseCase;
    public function __construct(LogoutUserUseCase $logoutUserUseCase)
    {
        $this->logoutUserUseCase = $logoutUserUseCase;
    }

    public function execute(Request $request)
    {
        if ($this->logoutUserUseCase->execute($request->user())) {
            return $this->success('Sesión finalizada', 200);
        }
        return $this->error('Ha ocurrido un error al cerrar la sesión', 403);
    }
}
