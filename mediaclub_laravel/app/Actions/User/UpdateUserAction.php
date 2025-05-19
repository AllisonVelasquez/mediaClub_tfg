<?php

namespace App\Actions\User;

use App\Application\UseCases\User\UpdateUserUseCase;
use App\Models\Usuario;
use App\Traits\ApiResponse;

class UpdateUserAction
{

    use ApiResponse;
    
    public function execute(Usuario $user, array $data)
    {

        if (app(UpdateUserUseCase::class)->execute($user, $data)) {
            return $this->success('Datos actualizados correctamente.', 200);
        }
        return $this->error('No se han podido actualizar los datos.', 403);
    }
}
