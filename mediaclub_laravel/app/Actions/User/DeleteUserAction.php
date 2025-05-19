<?php

namespace App\Actions\User;

use App\Application\UseCases\User\DeleteUserUseCase;
use App\Models\Usuario;
use App\Traits\ApiResponse;

class DeleteUserAction
{

    use ApiResponse;
    
    public function execute(Usuario $user, array $data)
    {

        if (app(DeleteUserUseCase::class)->execute($user, $data)) {
            return $this->success('Usuario eliminado.', 200);
        }
        return $this->error('No puedes eliminar este usuario.', 403);
    }
}
