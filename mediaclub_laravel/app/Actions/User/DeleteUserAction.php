<?php

namespace App\Actions\User;

use App\Application\UseCases\User\DeleteUserUseCase;
use App\Models\Usuario;
use App\Traits\ApiResponse;

class DeleteUserAction
{
    use ApiResponse;
    protected $deleteUserUseCase;
    public function __construct(DeleteUserUseCase $deleteUserUseCase) {
        $this->deleteUserUseCase = $$deleteUserUseCase;
    }
    
    public function execute(Usuario $user, array $data)
    {

        if ($this->deleteUserUseCase->execute($user, $data)) {
            return $this->success('Usuario eliminado.', 200);
        }
        return $this->error('No puedes eliminar este usuario.', 403);
    }
}
